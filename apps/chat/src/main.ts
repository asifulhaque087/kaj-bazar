import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CHAT_PACKAGE_NAME } from '@app/common/generated/chat';
import { GrpcValidationPipe, getProtoPath } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatModule,
    {
      transport: Transport.GRPC,
      options: {
        package: CHAT_PACKAGE_NAME,
        protoPath: getProtoPath('chat.proto'),
        url: '0.0.0.0:' + (process.env.GRPC_PORT || '50051'),
      },
    },
  );

  app.useGlobalPipes(GrpcValidationPipe);
  await app.listen();
}
bootstrap();
