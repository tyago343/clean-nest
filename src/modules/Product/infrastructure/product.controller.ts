import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductUsecasesProxyModule } from './product.usecases.module';
import { UseCaseProxy } from 'src/shared/infrastructure/usecases.proxy';
import { addProductUseCases } from '../application/usecases/create.product';
import { CreateProductDto } from './product.dto';
import { ProductPresenter } from './product.presenter';
import { getAllProductUseCases } from '../application/usecases/findAll.product';
import { getByIdProductUseCases } from '../application/usecases/findById.product';

@Controller('products')
@ApiTags('products')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class ProductController {
  constructor(
    @Inject(ProductUsecasesProxyModule.POST_PRODUCT_USECASES_PROXY)
    private readonly postProductUsecasesProxy: UseCaseProxy<addProductUseCases>,
    @Inject(ProductUsecasesProxyModule.GET_ALL_PRODUCTS_USECASES_PROXY)
    private readonly getAllProductsUsecasesProxy: UseCaseProxy<getAllProductUseCases>,
    @Inject(ProductUsecasesProxyModule.GET_PRODUCT_BY_ID_USECASES_PROXY)
    private readonly getProductByIdUsecasesProxy: UseCaseProxy<getByIdProductUseCases>,
  ) {}
  @Post('/')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const { name, price, description, images } = createProductDto;
    const newProduct = await this.postProductUsecasesProxy
      .getInstance()
      .execute({
        name,
        price,
        description,
        images,
      });
    return new ProductPresenter(newProduct);
  }
  @Get('/')
  @ApiResponse({ status: 200, description: 'Products found' })
  async getProducts() {
    return await this.getAllProductsUsecasesProxy.getInstance().execute();
  }
  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Product found' })
  async getProductById(@Param('id') id: string) {
    return await this.getProductByIdUsecasesProxy.getInstance().execute(id);
  }
}
