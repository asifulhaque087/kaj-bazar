import {
  Metadata,
  InterceptingCall,
  InterceptorOptions,
  Listener,
  Interceptor,
} from '@grpc/grpc-js';
import * as jwt from 'jsonwebtoken'; // 1. Import the library

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
        // metadata.add('gatewaytoken', 'the value');
        next(metadata, listener);
      },
    });
  };
};

// apps/gateway/src/grpc.interceptor.ts
// export const createModuleAuthInterceptor = (
//   serviceName: string,
//   secret: string,
// ) => {
//   return (options: InterceptorOptions, nextCall: Function) => {
//     return new InterceptingCall(nextCall(options), {
//       start: (metadata: Metadata, listener: Listener, next: Function) => {
//         // Create a NEW metadata instance from the existing one
//         const newMetadata = metadata.clone();

//         const token = jwt.sign({ service: serviceName }, secret);
//         newMetadata.add('gatewaytoken', token);

//         // Pass the NEW metadata to next()
//         next(newMetadata, listener);
//       },
//     });
//   };
// };

export const GlobalMetadataInterceptor: Interceptor = (options, nextCall) => {
  return new InterceptingCall(nextCall(options), {
    start: (metadata, listener, next) => {
      // Add your global metadata here
      // metadata.add('x-api-key', 'secret-123');
      // metadata.add('client-version', '1.0.0');
      metadata.set('x-api-key', 'secret-123');

      next(metadata, listener);
    },
  });
};
