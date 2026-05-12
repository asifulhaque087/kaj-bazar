// grpc-error.mapper.ts
import { HttpStatus } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';

// export class GrpcErrorMapper {
//   /**
//    * Maps gRPC status codes to HTTP status codes
//    */
//   static mapStatus(grpcCode: number): number {
//     const map: Record<number, number> = {
//       [grpc.status.OK]: HttpStatus.OK,
//       [grpc.status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
//       [grpc.status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
//       [grpc.status.NOT_FOUND]: HttpStatus.NOT_FOUND,
//       [grpc.status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
//       [grpc.status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
//       [grpc.status.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
//       [grpc.status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
//     };
//     return map[grpcCode] || HttpStatus.INTERNAL_SERVER_ERROR;
//   }

//   /**
//    * Cleans up the gRPC message string
//    */
//   static prepareMessage(exception: any): string {
//     let message = exception.message || 'An unexpected error occurred';
//     // Remove the gRPC prefix (e.g., "3 INVALID_ARGUMENT: ")
//     if (message.includes(':')) {
//       const parts = message.split(':');
//       message = parts[parts.length - 1].trim();
//     }
//     return message;
//   }

//   /**
//    * Parses the details field, handling both JSON and raw strings
//    */
//   static prepareDetails(details: string): any {
//     if (!details) return null;
//     try {
//       return JSON.parse(details);
//     } catch {
//       return details;
//     }
//   }
// }

export class GrpcErrorMapper {
  static mapStatus(grpcCode: number): number {
    const map: Record<number, number> = {
      [grpc.status.OK]: HttpStatus.OK,
      [grpc.status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
      [grpc.status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
      [grpc.status.NOT_FOUND]: HttpStatus.NOT_FOUND,
      [grpc.status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
      [grpc.status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
      [grpc.status.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
      [grpc.status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    return map[grpcCode] || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Always returns an array of { message, field? } objects
   */
  static prepareDetails(
    details: string,
    fallbackMessage: string,
  ): { message: string; field?: string }[] {
    if (!details) {
      return [{ message: fallbackMessage }];
    }

    try {
      const parsed = JSON.parse(details);

      // If it's already an array (like your validation output), return it
      if (Array.isArray(parsed)) {
        return parsed;
      }

      // If it's a single object that isn't an array
      return [parsed];
    } catch {
      // If it's a plain string (like 'User already exists'), wrap it in the structure
      return [{ message: details }];
    }
  }

  static prepareMessage(exception: any): string {
    let message = exception.message || 'An unexpected error occurred';
    if (message.includes(':')) {
      const parts = message.split(':');
      message = parts[parts.length - 1].trim();
    }
    return message;
  }
}
