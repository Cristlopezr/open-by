import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  //TODO:ENABLE CORS
  /* app.enableCors({
    origin: configService.getOrThrow<string[]>('allowed_origins'),
    methods: 'GET,POST',
  }); */

  /* app.useGlobalPipes(new StandardSchemaValidationPipe) */
  const port = configService.getOrThrow<number>('PORT');
  await app.listen(port);
}
bootstrap();
