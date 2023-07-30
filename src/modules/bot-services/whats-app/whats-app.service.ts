import { Injectable } from "@nestjs/common";
import { createBot } from "./chatBot";
import { NoticeDto } from "../../notice-send/dto/notice.dto";
import axios from "axios";

const whatsAppBot = createBot();

// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#text-messages
@Injectable()
export class WhatsAppService {
  async sendNotice(data: NoticeDto) {
    const phoneNumber = data.number || "789111795751";
    const textToSend = data.text || "hui";

    try {
      // const res = await whatsAppBot.sendTemplate(
      //   "",
      //   "hello_world",
      //   "en_US"
      // );
      const res = await whatsAppBot.sendText(phoneNumber, textToSend);
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
      const data = await whatsAppBot.parseMessage(payload);

      const token = "911702492:AAHG0Vm3jGvHaoG2WkTEF-sf3Zf4gKH_w5g";
      const chatID = "271713767";

      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&parse_mode=html&text=${JSON.stringify(
        data
      )}`;

      await axios.get(url);

      console.log(data);
    } catch (err) {
      console.log(err);
      return err;
    } finally {
    }
  }
}
