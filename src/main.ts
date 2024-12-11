import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV === 'development') {
    const docsConfig = new DocumentBuilder()
      .setTitle('SWAPI API TASK')
      .setDescription('NestJS API based on SWAPI offering many filtering options, caching and pagination')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, docsConfig);

    SwaggerModule.setup('docs', app, document);
  }


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
