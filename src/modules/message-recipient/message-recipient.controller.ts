import { WhatsAppService } from "../senders-services/whats-app/whats-app.service";

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
@Controller("message-recipient")
export class MessageRecipientController {
  constructor(private readonly WhatsAppService: WhatsAppService) {}

  @Post("whats-app")
  onWhatsAppMessage(@Body() payload) {
    return this.WhatsAppService.onMessage(payload);
  }

  @Get("whats-app")
  WhatsAppVerifyToken(@Query() query) {
    const mode = query["hub.mode"];
    const token = query["hub.verify_token"];
    const challenge = query["hub.challenge"];
    // console.log(mode, token, challenge);
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
      // Respond with 200 OK and challenge token from the request
      console.log("WHATS_APP_WEBHOOK_SUCCESS_VERIFIED");
      // Check the mode and token sent are correct

      return challenge;
    }
    console.log("WHATS_APP_WEBHOOK_VERIFY_FAILED");

    throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
  }
}
