import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rateLimit } from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 15 minutes
      max: 1000 // Limit each IP to 100 requests per windowMs
    })
  );
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
