import { DRIZZLE, RegisterUserDto, tryit } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as localSchema from './schemas';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
// import * as grpc from '@grpc/grpc-js'; // or 'grpc' depending on your setup
import grpc from '@grpc/grpc-js';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof localSchema>,
  ) {}

  async register(data: RegisterUserDto) {
    const { email } = data;

    const [isUser, err] = await tryit(
      this.db
        .select()
        .from(localSchema.AuthTable)
        .where(eq(localSchema.AuthTable.email, email))
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

    // we will do later
    return isUser;
  }

  async generateTokens(user: any) {
    const payload = { id: user.id, email: user.email };

    // 1. Access Token (Uses defaults from your registerAsync)
    const accessToken = await this.jwtService.signAsync(payload);

    // 2. Refresh Token (Overriding the default secret and expiration)
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
    });

    return { accessToken, refreshToken };
  }
}
