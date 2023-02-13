import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import { AppEnum } from '@config/app.enum';
import { config } from '@config/config';
import { ValidationPipe, Type } from '@nestjs/common';
import { NestLogger } from '@modules/secondary/logger/nest-logger';
import { logger } from '@modules/secondary/logger';

async function bootstrap() {
  const { module, port } = getApp(config.app.name);
  const app = await NestFactory.create(module, {
    cors: true,
    logger: new NestLogger()
  });

  app.enableCors({
    origin: '*'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false },
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  registerErrorHandlers();

  await app.listen(port);
  const appUrl = await app.getUrl();

  logger.info(`App ${config.app.name} listening on ${appUrl}`);
}

void bootstrap();

function getApp(name: AppEnum): {
  module: Type;
  port: number;
} {
  switch (name) {
    case AppEnum.EasyvslApi:
      return {
        module: AppModule,
        port: config.app.easyvsl_api.port
      };
  }
}

function registerErrorHandlers(): void {
  process.on('unhandledRejection', (err: Error) => {
    logger.error(
      {
        err
      },
      'unhandledRejection'
    );
  });

  process.on('uncaughtException', (err: Error) => {
    logger.error(
      {
        err
      },
      'uncaughtException'
    );
  });
}
