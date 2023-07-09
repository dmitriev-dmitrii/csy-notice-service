import { Module } from "@nestjs/common";
import { SendNoticeService } from "./send-notice.service";
import { SendNoticeController } from "./send-notice.controller";
import { WhatsAppService } from "../senders-services/whats-app/whats-app.service";

@Module({
  controllers: [SendNoticeController],
  providers: [WhatsAppService, SendNoticeService],
})
export class SendNoticeModule {}
