import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ALLExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo coge las propiedades del dto y las q no se desechan
      forbidNonWhitelisted: true, // las propiedades q no estan en el dto dice q no deberian estar
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new ALLExceptionFilter());

  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.setGlobalPrefix('api/v2');

  await app.listen(process.env.PORT || 3000);
  logger.log(`App running on Port ${process.env.PORT}`);
}

bootstrap();
