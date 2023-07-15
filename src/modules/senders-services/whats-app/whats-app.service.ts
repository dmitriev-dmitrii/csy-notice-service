import { Injectable } from "@nestjs/common";
import { createBot } from "./chatBot";
import { NoticeDto } from "../../send-notice/dto/notice.dto";

const whatsAppBot = createBot();

// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#text-messages
@Injectable()
export class WhatsAppService {
  async sendNotice(data: NoticeDto) {
    const phoneNumber = data.user;
    const textToSend = data.text;

    try {
      // const res = await whatsAppBot.sendTemplate(
      //   "",
      //   "hello_world",
      //   "en_US"
      // );
      // const res = await whatsAppBot.sendText(
      //   "",
      //   "https://yandex.ru/search/?text=wasap+buisnies+api.+mark+message+as+red&lr=2"
      // );
      // const res = await whatsAppBot.sendReplyButtons(
      //   "",
      //   "body txt ",
      //   { "123": "2344" }
      // );
      // console.log(res);
    } catch (err) {
      console.log(err);
      return err;
    } finally {
    }
  }
  async onMessage(payload) {
    // https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples
    try {
      const data = await whatsAppBot.readMessage(payload);
      console.log(data);
    } catch (err) {
      console.log(err);
      return err;
    } finally {
    }
  }
}
