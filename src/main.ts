import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import validationPipeConfig from "./config/validationPipeConfig";
import env from "./config/env";
const appPrefix = "api/notice/";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
  app.enableCors();
  app.setGlobalPrefix(appPrefix);

  await app.listen(env.APP_PORT);
}
bootstrap().then(() => {
  console.log(`app listen: http://localhost:${env.APP_PORT}/${appPrefix}`);
});
