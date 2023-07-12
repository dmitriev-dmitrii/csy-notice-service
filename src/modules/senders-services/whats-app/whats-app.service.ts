import env from "../../../config/env";
import { Injectable } from "@nestjs/common";
import { createBot } from "whatsapp-cloud-api";
import { NoticeDto } from "../../send-notice/dto/notice.dto";
import axios from "axios";

const { WHATSAPP_PHONE_ID, WHATSAPP_ACCESS_TOKEN, WHATSAPP_WEBHOOK_TOKEN, WHATSAPP_API_URL } =
  env;
// https://www.npmjs.com/package/whatsapp-cloud-api
// const webhookVerifyToken = WHATSAPP_ACCESS_TOKEN;

// const whatsAppBot = createBot(WHATSAPP_PHONE_ID, WHATSAPP_ACCESS_TOKEN);
// console.log(whatsAppBot);

// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#text-messages
@Injectable()
export class WhatsAppService {
  async sendNotice(data: NoticeDto) {
    // телефон юзера
    const phoneNumber = data.user;
    const textToSend = data.text;

    try {
      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phoneNumber,
        preview_url: false,
        type: "text",
        text: { body: textToSend },

        // type: "button",
        // sub_type: "quick_reply",
        // index: 0,
        // parameters: [
        //   {
        //     type: "payload",
        //     payload: "PAYLOAD",
        //   },
        // ],

//        type: "template",
//        template: { name: "hello_world", language: { code: "en_US" } },

        // type: "template",
        // template: { name: "payment", language: { code: "en_US" } },
      };

      // (fromPhoneNumberId: string, accessToken: string, version = "")
      await axios({
        method: "post",
        url: `${WHATSAPP_API_URL}/v17.0/${WHATSAPP_PHONE_ID}/messages`,
        data: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      // Send text message
      // const result = await whatsAppBot.sendText("789111795751", "Hello friend");
      // console.log(result);
      // return result;
    } catch (err) {
      console.log(err);
      return err;
    } finally {
    }
  }
}
