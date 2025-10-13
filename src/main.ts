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

  if (codespaceName) {
    // Running in Codespaces
    console.log(`\n🚀 App is running in GitHub Codespaces!`);
    console.log(`📱 Check the PORTS tab for the forwarded URL`);
    console.log(`🔗 Or use: https://${codespaceName}-${port}.app.github.dev`);
    console.log(
      `📚 Swagger: https://${codespaceName}-${port}.app.github.dev/api\n`,
    );
  } else {
    // Running locally
    console.log(`\n🚀 App listening on http://localhost:${port}`);
    console.log(`📚 Swagger at http://localhost:${port}/api\n`);
  }
}
bootstrap();
