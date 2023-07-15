import env from "../../../config/env";
import { Injectable } from "@nestjs/common";
import { createBot } from "./chatBot";
import { NoticeDto } from "../../send-notice/dto/notice.dto";

const whatsAppBot = createBot();

// https://github.com/tawn33y/whatsapp-cloud-api/blob/main/API.md
// https://www.npmjs.com/package/whatsapp-cloud-api

// const webhookVerifyToken = WHATSAPP_ACCESS_TOKEN;

// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#text-messages
@Injectable()
export class WhatsAppService {
  async sendNotice(data: NoticeDto) {
    // телефон юзера
    const phoneNumber = data.user;
    const textToSend = data.text;

    try {
      // const res = await whatsAppBot.sendTemplate(
      //   "",
      //   "hello_world",
      //   "en_US"
      // );
      const res = await whatsAppBot.sendText("", "hello_world");
      console.log(res);
    } catch (err) {
      console.log(err);
      return err;
    } finally {
    }
  }
  async onMessage(payload) {
    // https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples

    const message = await whatsAppBot.readMessage(payload);
    console.log(message);
    try {
      // const res = await whatsAppBot.sendTemplate(
      //   "",
      //   "hello_world",
      //   "en_US"
      // );
      // const res = await whatsAppBot.sendText("", "hello_world");
      // console.log(res);
    } catch (err) {
      console.log(err);
      return err;
    } finally {
    }
  }
}
