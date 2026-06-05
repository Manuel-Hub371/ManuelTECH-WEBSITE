import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) {
        return callback(null, true);
      }

      // Always allow any localhost port (covers all Vite dev server ports)
      const localhostRegex = /^http:\/\/localhost:\d+$/;
      if (localhostRegex.test(origin)) {
        return callback(null, true);
      }

      // Allow explicitly configured origins (for production / staging)
      const allowed = (process.env.CORS_ORIGIN || '')
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);

      if (allowed.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`ManuelTECH API running on http://localhost:${port}`);
}
bootstrap();
