import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from '@app/common/generated/user';
import { GrpcValidationPipe, getProtoPath } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: USER_PACKAGE_NAME,
      protoPath: getProtoPath('user.proto'),
      url: '0.0.0.0:' + (process.env.GRPC_PORT || '50051'),
    },
  });

  // 3. Configure the RabbitMQ Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://kaj_bazar:kaj_bazarpass@rabbitmq:5672'],
      queue: 'user-queue',
    },
  });

  app.useGlobalPipes(GrpcValidationPipe);

  await app.startAllMicroservices();
}
bootstrap();
