import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Forex Orders API')
    .setDescription('Orders + realtime updates')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    })
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Detect if running in GitHub Codespaces
  const codespaceName = process.env.CODESPACE_NAME;
  const codespaceDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

  if (codespaceName && codespaceDomain) {
    // Running in Codespaces - use the forwarded URL
    const appUrl = `https://${codespaceName}-${port}.${codespaceDomain}`;
    console.log(`App listening on ${appUrl}`);
    console.log(`Swagger at ${appUrl}/api`);
  } else {
    // Running locally
    console.log(`App listening on http://localhost:${port}`);
    console.log(`Swagger at http://localhost:${port}/api`);
  }
}
bootstrap();
