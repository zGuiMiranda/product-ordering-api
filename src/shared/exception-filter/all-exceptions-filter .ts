import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CastError } from 'mongoose';
import { I18nService } from 'nestjs-i18n';

const errorMessagesHelper = {
  CastError: (exception: CastError) => exception.message,
  HttpException: (exception: HttpException) => exception.getResponse(),
  TypeError: (exception: TypeError) => exception.message,
  BadRequestException: (exception: BadRequestException) =>
    exception.getResponse(),
  default: (exception: string) => exception,
};

const errorStatusHelper = {
  CastError: () => HttpStatus.BAD_REQUEST,
  HttpException: (exception: HttpException) => exception.getStatus(),
  TypeError: () => HttpStatus.INTERNAL_SERVER_ERROR,
  BadRequestException: (exception: BadRequestException) =>
    exception.getStatus(),
  default: () => HttpStatus.INTERNAL_SERVER_ERROR,
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: { name: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = (
      errorStatusHelper?.[exception.name] || errorStatusHelper?.default
    )?.(exception);

    const message = (
      errorMessagesHelper?.[exception.name] || errorMessagesHelper?.default
    )?.(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(message?.message ? { message: message.message } : { message }),
    });
  }
}
