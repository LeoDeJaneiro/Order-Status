import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.FRONTEND_HOST,
    }),
  );

  await app.listen(3001);
}
bootstrap();
