import { ValidationPipe, ValidationError } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';

export const GrpcValidationPipe = new ValidationPipe({
  whitelist: true,
  transform: true, // Required for @Type to work
  transformOptions: {
    enableImplicitConversion: false, // This stops Nest from "guessing" types
  },

  exceptionFactory: (errors: ValidationError[]) => {
    // Map the class-validator errors into a structured object
    const errorMessages = errors.map((error) => ({
      field: error.property,
      message: Object.values(error.constraints || {})[0],
    }));

    const metadata = new grpc.Metadata();
    metadata.add('is-grpc-exception', 'true');

    return new RpcException({
      code: status.INVALID_ARGUMENT,
      // message: 'Validation failed !!!!!!!!!!!!!1',
      // details: JSON.stringify(errorMessages),
      message: JSON.stringify(errorMessages),
      metadata: metadata,
    });
  },
});
