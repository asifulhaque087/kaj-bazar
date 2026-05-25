import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GrpcValidationPipe } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatModule,
    {
      transport: Transport.GRPC,
      options: {
        package: CHAT_PACKAGE_NAME,
        protoPath: 'libs/common/src/protos/chat.proto',
        url: '0.0.0.0:50051',
      },
    },
  );

  app.useGlobalPipes(GrpcValidationPipe);
  await app.listen();
}
bootstrap();
