import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { GrpcErrorMapper } from './grpc-error.mapper';

@Catch()
export class RpcToHttpFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const metadata = exception?.metadata;
    const isGrpc = metadata?.get('is-grpc-exception')?.[0] === 'true';

    if (isGrpc) {
      const statusCode = GrpcErrorMapper.mapStatus(exception.code);

      // In Nest gRPC, what you send as 'message' often arrives as 'details'
      const rawMessage = GrpcErrorMapper.prepareMessage(exception);

      // Ensure we always get [{ message, field? }]
      const errors = GrpcErrorMapper.prepareDetails(
        exception.details || exception.message,
        rawMessage,
      );

      return response.status(statusCode).json({
        errors: errors,
      });
    }

    // 2. Handle standard NestJS HttpExceptions (keep it consistent)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse() as any;
      const message = typeof res === 'object' ? res.message : exception.message;

      return response.status(status).json({
        errors: Array.isArray(message)
          ? message.map((m) => ({ message: m }))
          : [{ message: message }],
      });
    }

    // 3. Fallback
    return response.status(500).json({
      errors: [{ message: 'Internal Server Error' }],
    });
  }
}
