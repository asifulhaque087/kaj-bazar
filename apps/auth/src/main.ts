import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common/generated/auth';
import { GrpcValidationPipe, getProtoPath } from '@app/common';

async function bootstrap() {
  // const app = await NestFactory.create(AuthModule);
  // await app.listen(process.env.port ?? 3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath: getProtoPath('auth.proto'),
        url: '0.0.0.0:' + (process.env.GRPC_PORT || '50051'),
      },
    },
  );

  app.useGlobalPipes(GrpcValidationPipe);
  await app.listen();
}
bootstrap();
