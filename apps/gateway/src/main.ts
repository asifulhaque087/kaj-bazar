import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import cookieParser from 'cookie-parser'; // Change this line
import { RpcToHttpFilter } from 'apps/gateway/src/filters/rpc-to-http.filter';
import { GlobalHttpExceptionFilter } from 'apps/gateway/src/filters/global-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.use(cookieParser());
  // 2. Apply the Global gRPC Exception Filter
  // app.useGlobalFilters(new GlobalHttpExceptionFilter(), new RpcToHttpFilter());
  app.useGlobalFilters(new RpcToHttpFilter());

  // 3. Optional: Enable CORS if your frontend is on a different port
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
