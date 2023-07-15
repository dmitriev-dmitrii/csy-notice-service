import { Module } from "@nestjs/common";
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { SendNoticeModule } from "./modules/send-notice/send-notice.module";
import { MessageRecipientModule } from "./modules/message-recipient/message-recipient.module";

@Module({
  imports: [SendNoticeModule, MessageRecipientModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
