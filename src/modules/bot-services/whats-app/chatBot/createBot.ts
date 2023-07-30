import isURL from "validator/lib/isURL";
import { WhatsAppBot } from "./types/WhatsAppBot";
import {
  ContactMessage,
  InteractiveMessage,
  LocationMessage,
  MediaBase,
  MediaMessage,
  TemplateMessage,
  TextMessage,
  MessageStatus,
  markMessageAsReadResult,
  SendMessageResult,
  ParseMessageResult,
} from "./types/Messages";
import { sendRequest } from "./utils/sendRequest";

interface OfficialSendMessageResult {
  messaging_product: "whatsapp";
  contacts: {
    input: string;
    wa_id: string;
  }[];
  messages: {
    id: string;
  }[];
}

const parseSendMessageRes = (
  payload: OfficialSendMessageResult
): SendMessageResult => {
  return {
    messageId: payload.messages?.[0]?.id,
    phoneNumber: payload.contacts?.[0]?.input,
    whatsAppId: payload.contacts?.[0]?.wa_id,
  };
};
const getMediaPayload = (urlOrObjectId: string, options?: MediaBase) => ({
  ...(isURL(urlOrObjectId) ? { link: urlOrObjectId } : { id: urlOrObjectId }),
  caption: options?.caption,
  filename: options?.filename,
});
// примеры ответов сервака whats-app
// https://developers.facebook.com/docs/whatsapp/cloud-api/cwebhooks/payload-examples#text-messages
export const createBot = (): WhatsAppBot => {
  return {
    markMessageAsRead: async (messageId: string) => {
      const res = await sendRequest({
        status: MessageStatus.READ,
        message_id: messageId,
      });
      return res.data as markMessageAsReadResult;
    },

    async parseMessage(
      payload = {},
      readMessage = true
    ): Promise<ParseMessageResult> {
      console.log(JSON.stringify(payload));
      const whatsAppId =
        payload.entry[0]?.changes[0]?.value?.metadata?.phone_number_id;

      const phoneNumber =
        payload?.entry[0]?.changes[0]?.value?.messages[0]?.from;

      const name =
        payload?.entry[0]?.changes[0]?.value.contacts[0]?.profile?.name;

      const user = {
        phoneNumber,
        whatsAppId,
        name,
      };
      const message = {
        id: payload.entry[0]?.changes[0]?.value.messages[0]?.id,
        text: payload.entry[0]?.changes[0]?.value.messages[0]?.text?.body,
        status: MessageStatus.DELIVERED,
      };
      if (!readMessage) {
        return { message, user };
      }

      try {
        const res = await this.markMessageAsRead(message.id);
        const { status } = res;
        message.status = status;

        return { message, user };
      } catch (err) {
        console.warn("err markMessageAsRead " + message.id);
        console.error(err);
        return { message, user };
      }
    },

    sendText: async (to, text, options) => {
      const res = await sendRequest({
        to,
        type: "text",
        text: {
          body: text,
          preview_url: options?.preview_url,
        },
      });
      return parseSendMessageRes(res.data);
    },
    sendMessage(to, text, options) {
      return this.sendText(to, text, options);
    },
    sendImage: async (to, urlOrObjectId, options) => {
      const res = await sendRequest({
        to,
        type: "image",
        image: getMediaPayload(urlOrObjectId, options),
      });
      return parseSendMessageRes(res.data);
    },
    sendDocument: async (to, urlOrObjectId, options) => {
      const res = await sendRequest({
        to,
        type: "document",
        document: getMediaPayload(urlOrObjectId, options),
      });
      return parseSendMessageRes(res.data);
    },
    sendAudio: async (to, urlOrObjectId) => {
      const res = await sendRequest({
        to,
        type: "audio",
        audio: getMediaPayload(urlOrObjectId),
      });
      return parseSendMessageRes(res.data);
    },
    sendVideo: async (to, urlOrObjectId, options) => {
      const res = await sendRequest({
        to,
        type: "video",
        video: getMediaPayload(urlOrObjectId, options),
      });
      return parseSendMessageRes(res.data);
    },
    sendSticker: async (to, urlOrObjectId) => {
      const res = await sendRequest({
        to,
        type: "sticker",
        sticker: getMediaPayload(urlOrObjectId),
      });

      return parseSendMessageRes(res.data);
    },
    sendLocation: async (to, latitude, longitude, options) => {
      const res = await sendRequest({
        to,
        type: "location",
        location: {
          latitude,
          longitude,
          name: options?.name,
          address: options?.address,
        },
      });
      return parseSendMessageRes(res.data);
    },
    sendTemplate: async (to, name, languageCode, components) => {
      const res = await sendRequest({
        to,
        type: "template",
        template: {
          name,
          language: {
            code: languageCode,
          },
          components,
        },
      });
      return parseSendMessageRes(res.data);
    },
    sendContacts: async (to, contacts) => {
      const res = await sendRequest({
        to,
        type: "contacts",
        contacts,
      });
      return parseSendMessageRes(res.data);
    },
    sendReplyButtons: async (to, bodyText, buttons, options) => {
      const res = await sendRequest({
        to,
        type: "interactive",
        interactive: {
          body: {
            text: bodyText,
          },
          ...(options?.footerText
            ? {
                footer: { text: options?.footerText },
              }
            : {}),
          header: options?.header,
          type: "button",
          action: {
            buttons: Object.entries(buttons).map(([key, value]) => ({
              type: "reply",
              reply: {
                title: value,
                id: key,
              },
            })),
          },
        },
      });
      return parseSendMessageRes(res.data);
    },
    sendList: async (to, buttonName, bodyText, sections, options) => {
      const res = await sendRequest({
        to,
        type: "interactive",
        interactive: {
          body: {
            text: bodyText,
          },
          ...(options?.footerText
            ? {
                footer: { text: options?.footerText },
              }
            : {}),
          header: options?.header,
          type: "list",
          action: {
            button: buttonName,
            sections: Object.entries(sections).map(([key, value]) => ({
              title: key,
              rows: value,
            })),
          },
        },
      });
      return parseSendMessageRes(res.data);
    },
  };
};
