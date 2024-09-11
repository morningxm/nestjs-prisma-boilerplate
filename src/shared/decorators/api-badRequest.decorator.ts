import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiBadRequest(description: string = 'Bad Request') {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description,
    }),
  );
}
