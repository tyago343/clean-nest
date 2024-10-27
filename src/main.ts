import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import * as path from 'path';
async function bootstrap() {
  const ENV = process.env.NODE_ENV;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  if (ENV !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Magento API')
      .setDescription('API description from nest backend')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);
  }
  app.enableCors();
  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  await app.register(multipart);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
