import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Metadata } from '@grpc/grpc-js';
import { throwGrpcError, tryit } from '@app/common/utils';

export interface GrpcUserPayload {
  id: string;
  email: string;
}

// export type AuthGrpcRequest<T = Record<string, never>> = T & {
//   user: GrpcUserPayload;
// };

export type AuthGrpcRequest<T = {}> = T & {
  user: GrpcUserPayload;
};

@Injectable()
export class GrpcGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Switch to RPC context instead of HTTP
    const rpcContext = context.switchToRpc();
    const metadata: Metadata = rpcContext.getContext();

    // gRPC keys in metadata are automatically lowercased
    const authHeader = metadata.get('authorization')?.[0] as string;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throwGrpcError(
        'UNAUTHENTICATED',
        'Missing or invalid Authorization token',
      );
    }

    const token = authHeader.split(' ')[1];

    const [payload, err] = await tryit(this.jwtService.verifyAsync(token));

    if (err) throwGrpcError('UNAUTHENTICATED', 'Token verification failed');

    const data = rpcContext.getData();

    // Mutate the incoming data object to include the validated user metadata
    data.user = payload;

    return true;
  }
}
