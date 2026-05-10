import {
  Metadata,
  InterceptingCall,
  InterceptorOptions,
  Listener,
} from '@grpc/grpc-js';
import * as jwt from 'jsonwebtoken';

export const createModuleAuthInterceptor = (
  serviceName: string,
  secret: string,
) => {
  return (options: InterceptorOptions, nextCall: Function) => {
    return new InterceptingCall(nextCall(options), {
      start: (metadata: Metadata, listener: Listener, next: Function) => {
        const payload = { serviceName };
        const token = jwt.sign(payload, secret);
        metadata.add('gatewaytoken', token);

        next(metadata, listener);
      },
    });
  };
};
