import isURL from "validator/lib/isURL";
import { Bot } from "./createBot.types";
import {
  ContactMessage,
  InteractiveMessage,
  LocationMessage,
  MediaBase,
  MediaMessage,
  TemplateMessage,
  TextMessage,
} from "./messages.types";
import { sendRequestHelper } from "./sendRequestHelper";

interface PaylodBase {
  messaging_product: "whatsapp";
  recipient_type: "individual";
}

const payloadBase: PaylodBase = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
};

export const createBot = (): Bot => {
  const sendRequest = sendRequestHelper();

  const getMediaPayload = (urlOrObjectId: string, options?: MediaBase) => ({
    ...(isURL(urlOrObjectId) ? { link: urlOrObjectId } : { id: urlOrObjectId }),
    caption: options?.caption,
    filename: options?.filename,
  });

  return {
    readMessage(payload: any) {
      const whatsAppId =
        payload.entry[0].changes[0].value.metadata.phone_number_id;
      const phone = payload.entry[0].changes[0].value.messages[0].from ?? ""; // extract the phone number from the webhook payload
      const message =
        payload.entry[0].changes[0].value.messages[0].text.body ?? ""; // extract the message text from the webhook payload
      const name =
        payload.entry[0].changes[0].value.contacts?.[0]?.profile?.name ?? "";
      const user = {
        phone,
        whatsAppId,
        name,
      };
      return { message, user };
    },
    sendText: (to, text, options) =>
      sendRequest<TextMessage>({
        ...payloadBase,
        to,
        type: "text",
        text: {
          body: text,
          preview_url: options?.preview_url,
        },
      }),
    sendMessage(to, text, options) {
      return this.sendText(to, text, options);
    },
    sendImage: (to, urlOrObjectId, options) =>
      sendRequest<MediaMessage>({
        ...payloadBase,
        to,
        type: "image",
        image: getMediaPayload(urlOrObjectId, options),
      }),
    sendDocument: (to, urlOrObjectId, options) =>
      sendRequest<MediaMessage>({
        ...payloadBase,
        to,
        type: "document",
        document: getMediaPayload(urlOrObjectId, options),
      }),
    sendAudio: (to, urlOrObjectId) =>
      sendRequest<MediaMessage>({
        ...payloadBase,
        to,
        type: "audio",
        audio: getMediaPayload(urlOrObjectId),
      }),
    sendVideo: (to, urlOrObjectId, options) =>
      sendRequest<MediaMessage>({
        ...payloadBase,
        to,
        type: "video",
        video: getMediaPayload(urlOrObjectId, options),
      }),
    sendSticker: (to, urlOrObjectId) =>
      sendRequest<MediaMessage>({
        ...payloadBase,
        to,
        type: "sticker",
        sticker: getMediaPayload(urlOrObjectId),
      }),
    sendLocation: (to, latitude, longitude, options) =>
      sendRequest<LocationMessage>({
        ...payloadBase,
        to,
        type: "location",
        location: {
          latitude,
          longitude,
          name: options?.name,
          address: options?.address,
        },
      }),
    sendTemplate: (to, name, languageCode, components) =>
      sendRequest<TemplateMessage>({
        ...payloadBase,
        to,
        type: "template",
        template: {
          name,
          language: {
            code: languageCode,
          },
          components,
        },
      }),
    sendContacts: (to, contacts) =>
      sendRequest<ContactMessage>({
        ...payloadBase,
        to,
        type: "contacts",
        contacts,
      }),
    sendReplyButtons: (to, bodyText, buttons, options) =>
      sendRequest<InteractiveMessage>({
        ...payloadBase,
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
      }),
    sendList: (to, buttonName, bodyText, sections, options) =>
      sendRequest<InteractiveMessage>({
        ...payloadBase,
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
      }),
  };
};
