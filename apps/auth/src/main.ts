import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common/generated/auth';

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
  await app.listen();
}
bootstrap();
