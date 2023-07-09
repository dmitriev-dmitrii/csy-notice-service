import { Module } from "@nestjs/common";
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { SendNoticeModule } from "./modules/send-notice/send-notice.module";

@Module({
  imports: [SendNoticeModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
