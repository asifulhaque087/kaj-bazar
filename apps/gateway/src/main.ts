import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import cookieParser from 'cookie-parser'; // Change this line
import { RpcToHttpFilter } from './filters/rpc-to-http.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cookieParser());
  // 2. Apply the Global gRPC Exception Filter
  // app.useGlobalFilters(new GlobalHttpExceptionFilter(), new RpcToHttpFilter());
  app.useGlobalFilters(new RpcToHttpFilter());

  // 3. Optional: Enable CORS if your frontend is on a different port
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Kaj Bazar API')
    .setDescription('Kaj Bazar marketplace API documentation. This application still in DEVELOPMENT phase')
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .addCookieAuth('refresh_token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
