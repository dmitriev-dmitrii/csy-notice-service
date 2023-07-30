import { Module } from "@nestjs/common";

import { NoticeRecipientController } from "./notice-recipient.controller";
import { WhatsAppService } from "../bot-services/whats-app/whats-app.service";

@Module({
  controllers: [NoticeRecipientController],
  providers: [WhatsAppService],
})
export class NoticeRecipient {}
