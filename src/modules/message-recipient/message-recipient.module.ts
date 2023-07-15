import { Module } from "@nestjs/common";

import { MessageRecipientController } from "./message-recipient.controller";
import { WhatsAppService } from "../senders-services/whats-app/whats-app.service";

@Module({
  controllers: [MessageRecipientController],
  providers: [WhatsAppService],
})
export class MessageRecipientModule {}
