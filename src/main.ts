import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const appPrefix = "api/notice/";
const appPort = 6000;

const validationPipeConfig = {
  transform: true, // преобразовывает примитивы если может в params запроса /:id  '1' => 1
  // whitelist: true,
  // forbidNonWhitelisted: true,
  // disableErrorMessages: process.env.NODE_ENV === 'PRODUCTION' ? true : false,
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
  app.enableCors();
  app.setGlobalPrefix(appPrefix);

  await app.listen(appPort);
  console.log(`app listen: http://localhost:${appPort}${appPrefix}`);
}
bootstrap();
