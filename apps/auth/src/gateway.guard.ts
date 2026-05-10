import { Metadata } from '@grpc/grpc-js';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class GatewayGuard implements CanActivate {
  constructor(
    @Inject('EXPECTED_SERVICE_NAME') private readonly expectedService: string,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const type = context.getType();

    if (type === 'rpc') {
      const metadata: Metadata = context.switchToRpc().getContext();

      if (!metadata) return false;

      const token = metadata.get('gatewaytoken')[0] as string;

      const payload = jwt.verify(token, 'hello-auth') as {
        serviceName: string;
      };

      return payload.serviceName === this.expectedService;
    }

    return false;
  }
}
