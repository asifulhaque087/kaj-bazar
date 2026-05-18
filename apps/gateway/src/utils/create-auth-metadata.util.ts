import { Metadata } from '@grpc/grpc-js';

export const createAuthMetadata = (authHeader: string): Metadata => {
  const metadata = new Metadata();

  if (authHeader) {
    metadata.add('authorization', authHeader);
  }

  return metadata;
};
