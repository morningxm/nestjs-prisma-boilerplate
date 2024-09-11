import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiUnAuthorized(description: string = 'Unauthorized') {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description,
    }),
  );
}
