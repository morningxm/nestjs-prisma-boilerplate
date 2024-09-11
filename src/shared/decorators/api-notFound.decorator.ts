import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiNotFound(description: string = 'Not found') {
  return applyDecorators(
    ApiResponse({
      status: 404,
      description,
    }),
  );
}
