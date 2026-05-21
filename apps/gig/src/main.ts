import { NestFactory } from '@nestjs/core';
import { GigModule } from './gig.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GIG_PACKAGE_NAME } from '@app/common/generated/gig';
import { GrpcValidationPipe } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GigModule,
    {
      transport: Transport.GRPC,
      options: {
        package: GIG_PACKAGE_NAME,
        protoPath: 'libs/common/src/protos/gig.proto',
        url: '0.0.0.0:50051',
      },
    },
  );

  app.useGlobalPipes(GrpcValidationPipe);
  await app.listen();
}
bootstrap();
