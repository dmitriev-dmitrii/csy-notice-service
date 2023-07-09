import env from "../../../config/env";
import { Injectable } from "@nestjs/common";
import { createBot } from "whatsapp-cloud-api";
import { NoticeDto } from "../../send-notice/dto/notice.dto";

const { WHATSAPP_PHONE_ID, WHATSAPP_ACCESS_TOKEN, WHATSAPP_WEBHOOK_TOKEN } =
  env;
// https://www.npmjs.com/package/whatsapp-cloud-api
// const webhookVerifyToken = WHATSAPP_ACCESS_TOKEN;

const whatsAppBot = createBot(WHATSAPP_PHONE_ID, WHATSAPP_ACCESS_TOKEN);
console.log(whatsAppBot);
@Injectable()
export class WhatsAppService {
  async sendNotice(data: NoticeDto) {
    try {
      // Send text message
      const result = await whatsAppBot.sendText("789111795751", "Hello friend");
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    } finally {
    }
  }
}
