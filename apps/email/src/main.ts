import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EmailModule } from './email.module';

async function bootstrap() {
  // const app = await NestFactory.create(EmailModule);
  // await app.listen(process.env.port ?? 3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://kaj_bazar:kaj_bazarpass@rabbitmq:5672'],
        queue: 'email-queue',
      },
    },
  );
  app.listen();
}
bootstrap();
