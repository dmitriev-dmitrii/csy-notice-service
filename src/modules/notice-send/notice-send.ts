import { Module } from "@nestjs/common";
import { NoticeSendService } from "./notice-send.service";
import { NoticeSendController } from "./notice-send.controller";
import { WhatsAppService } from "../bot-services/whats-app/whats-app.service";

@Module({
  controllers: [NoticeSendController],
  providers: [WhatsAppService, NoticeSendService],
})
export class NoticeSend {}
