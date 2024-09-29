import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Exception,
  FormatExceptionMessage,
} from 'src/shared/domain/exceptions/exception.interface';

@Injectable()
export class ExceptionsService implements Exception {
  badRequestException(data: FormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: FormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: FormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  UnauthorizedException(data?: FormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
}
