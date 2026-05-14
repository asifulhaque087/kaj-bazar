import { DRIZZLE, RegisterUserDto, throwGrpcError, tryit } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { DrizzleDB } from 'apps/auth/drizzle/drizzle';
import { AuthTable } from 'apps/auth/src/schemas';
import crypto from 'crypto';
import { hashPassword } from 'apps/auth/src/utils/hashing.util';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @Inject(DRIZZLE) private db: DrizzleDB,
  ) {}

  async register(data: RegisterUserDto) {
    // find the user by email
    const [user, userErr] = await tryit(
      this.db
        .select()
        .from(AuthTable)
        .where(eq(AuthTable.email, data.email))
        .limit(1)
        .then((res) => res[0]),
    );

    if (userErr) throwGrpcError('INTERNAL', userErr.message);

    if (user) throwGrpcError('ALREADY_EXISTS', 'User already exists');

    // generate email verification token
    const randomCharacters = crypto.randomBytes(20).toString('hex');

    // hash the password
    const [hashedPassword, hashedPasswordErr] = await tryit(
      hashPassword(data.password),
    );

    if (hashedPasswordErr)
      throwGrpcError('INTERNAL', hashedPasswordErr.message);

    // create auth user in database
    const [newUser, newUserErr] = await tryit(
      this.db
        .insert(AuthTable)
        .values({
          ...data,
          profilePublicId: 'a random id',
          password: hashedPassword,
          emailVerificationToken: randomCharacters,
        })
        .returning()
        .then((res) => res[0]),
    );

    if (newUserErr) {
      console.error('Database failure:', newUserErr.message);
      throwGrpcError('INTERNAL', 'An unexpected error occurred');
    }

    // Send email verification message to queue
    const verificationLink = `${this.configService.getOrThrow<string>('CLIENT_URL')}/confirm_email?v_token=${newUser.emailVerificationToken}`;

    // Todo : we will publish an event here

    // generate tokens
    const [newTokens, newTokensErr] = await tryit(
      this.generateTokens(newUser.id, newUser.email),
    );

    if (newTokensErr) {
      throwGrpcError('INTERNAL', 'An unexpected error occurred');
    }

    const { accessToken, refreshToken } = newTokens;

    // return response
    return {
      ...newUser,
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
