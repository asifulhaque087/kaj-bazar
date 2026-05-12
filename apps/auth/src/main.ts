import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common/generated/auth';
import { ValidationPipe } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';

async function bootstrap() {
  // const app = await NestFactory.create(AuthModule);
  // await app.listen(process.env.port ?? 3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath: 'libs/common/src/protos/auth.proto',
        url: '0.0.0.0:50051',
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        // Map the class-validator errors into a structured object
        const errorMessages = errors.map((error) => {
          return {
            field: error.property,
            message: Object.values(error.constraints || {})[0],
          };
        });

        const metadata = new grpc.Metadata();
        metadata.add('is-grpc-exception', 'true');

        return new RpcException({
          code: status.INVALID_ARGUMENT, // Code: 3
          // message: 'Validation failed !!!!!!!!!!!!!1',
          // details: JSON.stringify(errorMessages),
          message: JSON.stringify(errorMessages),
          metadata: metadata,
        });
      },
    }),
  );
  await app.listen();
}
bootstrap();
