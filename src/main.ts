import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import validationPipeConfig from "./config/validationPipeConfig";
import env from "./config/env";

const { APP_PORT } = env;
const appPrefix = "api/notice/";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
  app.enableCors();
  app.setGlobalPrefix(appPrefix);

  await app.listen(APP_PORT);
}
bootstrap().then(() => {
  console.log(`app listen: http://localhost:${APP_PORT}/${appPrefix}`);
});
