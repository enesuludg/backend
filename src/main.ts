import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet'; // security feature
import { Logger } from '@nestjs/common';
import { corsConfig, HTTP_PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.enableCors(corsConfig);

  await app
    .listen(HTTP_PORT, '0.0.0.0')
    .then(() => {
      Logger.verbose(`Appplication started on port: ${HTTP_PORT}`);
    })
    .catch((err) => Logger.error(err));

  process.on('SIGINT', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });
}
bootstrap();
