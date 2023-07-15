import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { WhatsAppService } from "../senders-services/whats-app/whats-app.service";
@Controller("message-recipient")
export class MessageRecipientController {
  constructor(private readonly WhatsAppService: WhatsAppService) {}

  @Post("whats-app")
  onWhatsAppMessage(@Body() payload) {
    return this.WhatsAppService.onMessage(payload);
  }
}
