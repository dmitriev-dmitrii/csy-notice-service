import { WhatsAppService } from "../bot-services/whats-app/whats-app.service";

import env from "../../config/env";
const { APP_ACCESS_TOKEN } = env;

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";
import { BotType } from "../bot-services/types/BotType";
@Controller("notice-recipient")
export class NoticeRecipientController {
  constructor(private readonly WhatsAppService: WhatsAppService) {}

  @Post(BotType.WHATS_APP)
  onWhatsAppMessage(@Body() payload) {
    // webhook для входящих сообщений WHATS_APP
    return this.WhatsAppService.onMessage(payload);
  }

  @Get(BotType.WHATS_APP)
  WhatsAppVerifyToken(@Query() query) {
    // сюда переодически стреляет фейсбук - проверяет webhook и  делает для себя токен

    const mode = query["hub.mode"];
    const token = query["hub.verify_token"];
    const challenge = query["hub.challenge"];

    if (!mode) {
      throw new HttpException(
        "param 'hub.mode' is required",
        HttpStatus.BAD_REQUEST
      );
    }
    if (!token) {
      throw new HttpException(
        "param 'hub.verify_token' is required",
        HttpStatus.BAD_REQUEST
      );
    }

    if (mode === "subscribe" && token === APP_ACCESS_TOKEN) {
      console.log("WHATS_APP_WEBHOOK_SUCCESS_VERIFIED");

      return challenge;
    }
    console.log("WHATS_APP_WEBHOOK_VERIFY_FAILED");

    throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
  }
}
