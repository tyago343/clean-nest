import { Controller } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class ProductController {}
