import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
// import { AppService } from './app.service';
import { NoticeSend } from "./modules/notice-send/notice-send";
import { NoticeRecipient } from "./modules/notice-recipient/notice-recipient";

@Module({
  imports: [NoticeSend, NoticeRecipient],
  controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
