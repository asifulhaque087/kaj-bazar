import { DRIZZLE, RegisterUserDto, tryit } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
// import grpc from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js'; // or 'grpc' depending on your setup
import type { DrizzleDB } from 'apps/auth/drizzle/drizzle';
import { AuthTable } from 'apps/auth/src/schemas';

export const throwGrpcError = (code: grpc.status, message: string) => {
  const metadata = new grpc.Metadata();
  // Add your custom identifier here
  metadata.add('is-grpc-exception', 'true');

  throw new RpcException({
    code: code,
    message: message, // This becomes 'details' on the receiving end
    metadata: metadata,
  });
};

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {}

  async register(data: RegisterUserDto) {
    throwGrpcError(
      grpc.status.ALREADY_EXISTS,
      'User with this email already exists',
    );

    // throw new RpcException({
    //   code: grpc.status.ALREADY_EXISTS,
    //   message: 'User with this email already exists',
    // });

    const [isUser, err] = await tryit(
      this.db
        .select()
        .from(AuthTable)
        .where(eq(AuthTable.email, data.email))
        .limit(1)
        .then((res) => res[0]),
    );

    if (err) {
      console.error('Database failure:', err);

      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'An unexpected error occurred',
      });
    }

    if (isUser) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'User with this email already exists',
      });
    }

    // Prepare auth data

    // Create auth user in database
    const result = await tryit(
      this.db
        .insert(AuthTable)
        .values({ ...data, profilePublicId: 'a random id' })
        .returning()
        .then((res) => res[0]),
    );

    if (result[1]) {
      console.error('Database failure:', err);

      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'An unexpected error occurred',
      });
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      result[0].id,
      result[0].email,
    );

    return {
      ...result[0],
      accessToken,
      refreshToken,
      country: 'bangladesh',
    };
  }

  async generateTokens(id: string, email: string) {
    const payload = { id: id, email: email };

    // 1. Access Token (Uses defaults from your registerAsync)
    const accessToken = await this.jwtService.signAsync(payload);

    // 2. Refresh Token (Overriding the default secret and expiration)
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
    });

    await tryit(
      this.db
        .update(AuthTable)
        .set({ refreshToken })
        .where(eq(AuthTable.id, id)),
    );

    return { accessToken, refreshToken };
  }
}
