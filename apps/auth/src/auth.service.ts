import {
  ChangePasswordDto,
  DRIZZLE,
  ForgotPasswordDto,
  LoginUserDto,
  RegisterUserDto,
  ResendVerificationLinkDto,
  ResetPasswordDto,
  throwGrpcError,
  tryit,
  ValidateSocialUserDto,
  VerifyEmailDto,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq, gt } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { DrizzleDB } from 'apps/auth/drizzle/drizzle';
import { AuthTable } from 'apps/auth/src/schemas';
import crypto from 'crypto';
import { hashPassword, verifyPassword } from 'apps/auth/src/utils/hashing.util';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @Inject(DRIZZLE) private db: DrizzleDB,
    @Inject('AUTH_SERVICE') private rabbitClient: ClientProxy,
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

    this.rabbitClient.emit('send-email', {
      subject: 'Verify Your Email',
      receiver: newUser.email!,
      verifyLink: verificationLink,
      templateName: 'verifyEmail',
      username: newUser.username,
    });

    // generate tokens
    const [newTokens, newTokensErr] = await tryit(
      this.generateTokens(newUser.id, newUser.email),
    );

    if (newTokensErr) {
      throwGrpcError('INTERNAL', 'An unexpected error occurred');
    }

    const { accessToken, refreshToken } = newTokens;

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ auth => auth service', data);

    // return response
    return {
      ...newUser,
      accessToken,
      refreshToken,
      country: 'bangladesh',
      profilePicture: newUser.profilePicture ?? undefined,
    };
  }

  async resendVerificationLink(data: ResendVerificationLinkDto) {
    const { email } = data;

    // find user
    const [user, userErr] = await tryit(
      this.db
        .select()
        .from(AuthTable)
        .where(eq(AuthTable.email, email))
        .limit(1)
        .then((res) => res[0]),
    );

    if (userErr) throwGrpcError('INTERNAL', userErr.message);
    if (!user) throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    if (user.emailVerified) {
      return throwGrpcError('INVALID_ARGUMENT', 'You are already verified');
    }

    // Generate verfication link
    const randomCharacters = crypto.randomBytes(20).toString('hex');
    const verificationLink = `${this.configService.getOrThrow<string>('CLIENT_URL')}/confirm_email?v_token=${randomCharacters}`;

    const [newUser, newUserErr] = await tryit(
      this.db
        .update(AuthTable)
        .set({ emailVerificationToken: randomCharacters })
        .where(eq(AuthTable.id, user.id))
        .returning()
        .then((res) => res[0]),
    );

    if (newUserErr) throwGrpcError('INTERNAL', newUserErr.message);

    this.rabbitClient.emit('send-email', {
      subject: 'Verify Your Email',
      receiver: newUser.email!,
      verifyLink: verificationLink,
      templateName: 'verifyEmail',
      username: newUser.username,
    });

    return { message: 'A verification link send to your email' };
  }

  async verifyEmail(data: VerifyEmailDto) {
    // Find user by token
    const [user, userErr] = await tryit(
      this.db
        .select()
        .from(AuthTable)
        .where(eq(AuthTable.emailVerificationToken, data.token))
        .limit(1)
        .then((res) => res[0]),
    );

    if (userErr) throwGrpcError('INTERNAL', userErr.message);
    if (!user) throwGrpcError('NOT_FOUND', 'User not found');

    // Verify User Email
    const [_, verifyUserErr] = await tryit(
      this.db
        .update(AuthTable)
        .set({ emailVerified: true, emailVerificationToken: null })
        .where(eq(AuthTable.id, user.id)),
    );

    if (verifyUserErr) throwGrpcError('INTERNAL', verifyUserErr.message);

    return { message: 'Account verified successfully' };
  }

  async login(data: LoginUserDto) {
    // find user
    const [user, userErr] = await tryit(
      this.db
        .select()
        .from(AuthTable)
        .where(eq(AuthTable.email, data.email))
        .limit(1)
        .then((res) => res[0]),
    );

    if (userErr) throwGrpcError('INTERNAL', userErr.message);
    if (!user) throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');
    if (!user.password) {
      return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');
    }

    // compare password
    const [validPassword, validPasswordErr] = await tryit(
      verifyPassword(data.password, user.password),
    );

    if (validPasswordErr) throwGrpcError('INTERNAL', validPasswordErr.message);
    if (!validPassword)
      throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    // generate tokens

    const [newTokens, newTokensErr] = await tryit(
      this.generateTokens(user.id, user.email),
    );

    if (newTokensErr) {
      throwGrpcError('INTERNAL', 'An unexpected error occurred');
    }

    const { accessToken, refreshToken } = newTokens;

    // return response
    return {
      ...user,
      accessToken,
      refreshToken,
      country: 'bangladesh',
      profilePicture: user.profilePicture ?? undefined,
    };
  }

  async validateSocialUser(data: ValidateSocialUserDto) {
    const [user, userErr] = await tryit(
      this.db
        .insert(AuthTable)
        .values(data)
        .onConflictDoNothing()
        .returning()
        .then((res) => res[0]),
    );

    if (userErr || !user) {
      throwGrpcError('INTERNAL', 'An unexpected error occurred');
    }

    const [newTokens, newTokensErr] = await tryit(
      this.generateTokens(user.id, user.email),
    );

    if (newTokensErr) {
      throwGrpcError('INTERNAL', 'An unexpected error occurred');
    }

    const { accessToken, refreshToken } = newTokens;

    // return response
    return {
      ...user,
      accessToken,
      refreshToken,
      country: 'bangladesh',
      profilePicture: user.profilePicture ?? undefined,
    };
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const { email } = data;

    const [user, userErr] = await tryit(
      this.db
        .select()
        .from(AuthTable)
        .where(eq(AuthTable.email, email))
        .limit(1)
        .then((res) => res[0]),
    );

    if (userErr) throwGrpcError('INTERNAL', userErr.message);
    if (!user) throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    // generate new token and update user
    const randomCharacters = crypto.randomBytes(20).toString('hex');
    const date: Date = new Date();
    date.setHours(date.getHours() + 1);

    const [_, newUserErr] = await tryit(
      this.db
        .update(AuthTable)
        .set({
          passwordResetToken: randomCharacters,
          passwordResetExpires: date,
        })
        .where(eq(AuthTable.id, user.id)),
    );

    if (newUserErr) throwGrpcError('INTERNAL', newUserErr.message);

    const passwordResetLink = `${this.configService.getOrThrow<string>('CLIENT_URL')}/reset_password?token=${randomCharacters}`;

    this.rabbitClient.emit('send-email', {
      subject: 'Reset your KajBazar password',
      receiver: email,
      resetLink: passwordResetLink,
      templateName: 'forgotPassword',
      username: user.username,
    });

    return { message: 'Reset password link sent' };
  }

  async resetPassword(data: ResetPasswordDto) {
    const [user, userErr] = await tryit(
      this.db.query.AuthTable.findFirst({
        where: and(
          eq(AuthTable.passwordResetToken, data.token),
          gt(AuthTable.passwordResetExpires, new Date()),
        ),
      }),
    );

    if (userErr) return throwGrpcError('INTERNAL', userErr.message);
    if (!user) return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    // hash the password
    const [hashedPassword, hashedPasswordErr] = await tryit(
      hashPassword(data.password),
    );

    if (hashedPasswordErr)
      return throwGrpcError('INTERNAL', hashedPasswordErr.message);

    // update password
    const [_, newUserErr] = await tryit(
      this.db
        .update(AuthTable)
        .set({
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        })
        .where(eq(AuthTable.id, user.id)),
    );

    if (newUserErr) throwGrpcError('INTERNAL', newUserErr.message);

    // send email
    // todo : send email

    this.rabbitClient.emit('send-email', {
      subject: 'Password Reset Successful',
      receiver: user.email,
      templateName: 'resetPasswordSuccess',
      username: user.username,
    });

    return { message: 'Password reset successfully' };
  }

  async changePassword(data: ChangePasswordDto) {
    const [user, userErr] = await tryit(
      this.db
        .select()
        .from(AuthTable)
        .where(eq(AuthTable.email, data.email))
        .limit(1)
        .then((res) => res[0]),
    );

    if (userErr) throwGrpcError('INTERNAL', userErr.message);
    if (!user) throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    // hash password and update user
    // hash the password
    const [hashedPassword, hashedPasswordErr] = await tryit(
      hashPassword(data.password),
    );

    if (hashedPasswordErr)
      return throwGrpcError('INTERNAL', hashedPasswordErr.message);

    // update password
    const [_, newUserErr] = await tryit(
      this.db
        .update(AuthTable)
        .set({
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        })
        .where(eq(AuthTable.id, user.id)),
    );

    if (newUserErr) throwGrpcError('INTERNAL', newUserErr.message);

    // send email
    // todo : send email

    this.rabbitClient.emit('send-email', {
      subject: 'Password changed Successful',
      receiver: user.email,
      templateName: 'resetPasswordSuccess',
      username: user.username,
    });

    return { message: 'Password changed successfully' };
  }

  async whoAmI() {
    const email = 'mridul@example.com';

    const [user, userErr] = await tryit(
      this.db.query.AuthTable.findFirst({
        where: eq(AuthTable.email, email),
      }),
    );

    if (userErr) return throwGrpcError('INTERNAL', userErr.message);
    if (!user) return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return {
      ...user,
      country: user.country ?? undefined,
      profilePicture: user.profilePicture ?? undefined,
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
