This repo contains all codes for the ECommerce freelance marketplace application.

### Client
* The `client` folder contains the frontend code.
* The frontend application is built using `React`, `Typescript` and `Tailwindcss`.


## Running Locally
* To start the services locally, you need to first start the required services inside the docker compose file.
* `redis`
  * `docker compose up -d redis`
* `mongodb`
  * `docker compose up -d mongodb`
* `mysql`
  * `docker compose up -d mysql`
* `postgres`
  * `docker compose up -d postgres`
* `rabbitmq`
  * `docker compose up -d redis`


Please start the microservices in this order.
* `review service`
* `order service`
* `chat service`
* `gig service`
* `users service`
* `auth service`
* `notification service`
* Before you start the `gateway service`, make sure all other services are running without errors.



I am using sequealize Orm but now I want to use drizzle


// database.ts


import { Sequelize } from 'sequelize';


export const sequelize: Sequelize = new Sequelize(process.env.MYSQL_DB!,  {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    multipleStatements: true
  }
});

export async function databaseConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('AuthService Mysql database connection has been established successfully.');
  } catch (error) {
    console.log('Auth Service - Unable to connect to database.');
    console.log('error', 'AuthService databaseConnection() method error:', error);
  }
}


// auth.schema.ts

import { sequelize } from '@auth/database';
import { IAuthDocument } from '@fvoid/shared-lib';
import { compare, hash } from 'bcryptjs';
import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';

const SALT_ROUND = 10;

interface AuthModelInstanceMethods extends Model {
  prototype: {
    comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
    hashPassword: (password: string) => Promise<string>;
  }
}

type AuthUserCreationAttributes = Optional<IAuthDocument, 'id' | 'createdAt' | 'passwordResetToken' | 'passwordResetExpires'>;

const AuthModel: ModelDefined<IAuthDocument, AuthUserCreationAttributes> & AuthModelInstanceMethods = sequelize.define('auths', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePublicId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailVerificationToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },
  browserName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deviceType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  otp: {
    type: DataTypes.STRING
  },
  otpExpiration: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now
  },
  passwordResetToken: { type: DataTypes.STRING, allowNull: true },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['username']
    },
    {
      unique: true,
      fields: ['emailVerificationToken']
    },
  ]
}) as ModelDefined<IAuthDocument, AuthUserCreationAttributes> & AuthModelInstanceMethods;

AuthModel.addHook('beforeCreate', async (auth: Model) => {
  const hashedPassword: string = await hash(auth.dataValues.password as string, SALT_ROUND);
  auth.dataValues.password = hashedPassword;
});

AuthModel.prototype.comparePassword = async function (password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
};

AuthModel.prototype.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

// force: true always deletes the table when there is a server restart
AuthModel.sync({});
export { AuthModel };







// signup.ts

import crypto from 'crypto';

import { signupSchema } from '@auth/schemes/signup';
import { createAuthUser, getUserByUsernameOrEmail, signToken } from '@auth/services/auth.service';
import { BadRequestError, IAuthDocument, IEmailMessageDetails, firstLetterUppercase, lowerCase, uploads } from '@fvoid/shared-lib';
import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { UploadApiResponse } from 'cloudinary';
import { config } from '@auth/config';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { StatusCodes } from 'http-status-codes';

export async function create(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(signupSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'SignUp create() method error');
  }

  const { username, email, password, country, profilePicture, browserName, deviceType } = req.body;
  const checkIfUserExist: IAuthDocument | undefined = await getUserByUsernameOrEmail(username, email);
  if (checkIfUserExist) {
    throw new BadRequestError('Invalid credentials. Email or Username', 'SignUp create() method error');
  }

  const profilePublicId = uuidV4();
  const uploadResult: UploadApiResponse = (await uploads(profilePicture, `${profilePublicId}`, true, true)) as UploadApiResponse;

  if (!uploadResult.public_id) {
    throw new BadRequestError('File upload error. Try again', 'SignUp create() method error');
  }
  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString('hex');
  const authData: IAuthDocument = {
    username: firstLetterUppercase(username),
    email: lowerCase(email),
    profilePublicId,
    password,
    country,
    profilePicture: uploadResult?.secure_url,
    emailVerificationToken: randomCharacters,
    browserName,
    deviceType
  } as IAuthDocument;
  const result: IAuthDocument = (await createAuthUser(authData)) as IAuthDocument;
  const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${authData.emailVerificationToken}`;
  const messageDetails: IEmailMessageDetails = {
    receiverEmail: result.email,
    verifyLink: verificationLink,
    template: 'verifyEmail'
  };
  await publishDirectMessage(
    authChannel,
    'jobber-email-notification',
    'auth-email',
    JSON.stringify(messageDetails),
    'Verify email message has been sent to notification service.'
  );
  const userJWT: string = signToken(result.id!, result.email!, result.username!);
  res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user: result, token: userJWT });
}import { config } from '@auth/config';
import { AuthModel } from '@auth/models/auth.schema';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { IAuthBuyerMessageDetails, IAuthDocument, firstLetterUppercase, lowerCase } from '@fvoid/shared-lib';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { Model, Op } from 'sequelize';

export async function createAuthUser(data: IAuthDocument): Promise<IAuthDocument | undefined> {
  console.log('data is ', data);

  try {
    const result: Model = await AuthModel.create(data);
    const messageDetails: IAuthBuyerMessageDetails = {
      username: result.dataValues.username!,
      email: result.dataValues.email!,
      profilePicture: result.dataValues.profilePicture!,
      country: result.dataValues.country!,
      createdAt: result.dataValues.createdAt!,
      type: 'auth'
    };

    console.log('from crete auth user service');

    await publishDirectMessage(
      authChannel,
      'jobber-buyer-update',
      'user-buyer',
      JSON.stringify(messageDetails),
      'Buyer details sent to buyer service.'
    );
    const userData: IAuthDocument = omit(result.dataValues, ['password']) as IAuthDocument;
    return userData;
  } catch (error) {
    console.error(error);
  }
}

export async function getAuthUserById(authId: number): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await AuthModel.findOne({
      where: { id: authId },
      attributes: {
        exclude: ['password']
      }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await AuthModel.findOne({
      where: {
        [Op.or]: [{ username: firstLetterUppercase(username) }, { email: lowerCase(email) }]
      }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserByUsername(username: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await AuthModel.findOne({
      where: { username: firstLetterUppercase(username) }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserByEmail(email: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await AuthModel.findOne({
      where: { email: lowerCase(email) }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    console.error(error);
  }
}

export async function getAuthUserByVerificationToken(token: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await AuthModel.findOne({
      where: { emailVerificationToken: token },
      attributes: {
        exclude: ['password']
      }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    console.error(error);
  }
}

export async function getAuthUserByPasswordToken(token: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await AuthModel.findOne({
      where: {
        [Op.and]: [{ passwordResetToken: token }, { passwordResetExpires: { [Op.gt]: new Date() } }]
      }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    console.error(error);
  }
}

export async function getAuthUserByOTP(otp: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = (await AuthModel.findOne({
      where: {
        [Op.and]: [{ otp }, { otpExpiration: { [Op.gt]: new Date() } }]
      }
    })) as Model;
    return user?.dataValues;
  } catch (error) {
    console.error(error);
  }
}

export async function updateVerifyEmailField(authId: number, emailVerified: number, emailVerificationToken?: string): Promise<void> {
  try {
    await AuthModel.update(
      !emailVerificationToken
        ? {
            emailVerified
          }
        : {
            emailVerified,
            emailVerificationToken
          },
      { where: { id: authId } }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function updatePasswordToken(authId: number, token: string, tokenExpiration: Date): Promise<void> {
  try {
    await AuthModel.update(
      {
        passwordResetToken: token,
        passwordResetExpires: tokenExpiration
      },
      { where: { id: authId } }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function updatePassword(authId: number, password: string): Promise<void> {
  try {
    await AuthModel.update(
      {
        password,
        passwordResetToken: '',
        passwordResetExpires: new Date()
      },
      { where: { id: authId } }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserOTP(
  authId: number,
  otp: string,
  otpExpiration: Date,
  browserName: string,
  deviceType: string
): Promise<void> {
  try {
    await AuthModel.update(
      {
        otp,
        otpExpiration,
        ...(browserName.length > 0 && { browserName }),
        ...(deviceType.length > 0 && { deviceType })
      },
      { where: { id: authId } }
    );
  } catch (error) {
    console.error(error);
  }
}

export function signToken(id: number, email: string, username: string): string {
  return sign(
    {
      id,
      email,
      username
    },
    config.JWT_TOKEN!
  );
}








// app.ts

import express, { Express } from 'express';
import { start } from '@auth/server';

import { databaseConnection } from '@auth/database';
import { config } from '@auth/config';

const initialize = (): void => {
  config.cloudinaryConfig();
  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();