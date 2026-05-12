import * as grpc from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

type GrpcStatusName = keyof typeof grpc.status;

export const throwGrpcError = (statusName: GrpcStatusName, message: string) => {
  const metadata = new grpc.Metadata();
  metadata.add('is-grpc-exception', 'true');

  const code = grpc.status[statusName];

  throw new RpcException({
    code: code,
    message: message,
    metadata: metadata,
  });
};
