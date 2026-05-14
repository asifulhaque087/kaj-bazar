// decorators/get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthTokens } from 'apps/gateway/src/strategies/google.strategy';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthTokens => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
