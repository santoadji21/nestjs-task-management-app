import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/auth.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
