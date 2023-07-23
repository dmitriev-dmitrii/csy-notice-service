import isURL from "validator/lib/isURL";
import { Bot } from "./interfaces";
import {
  ContactMessage,
  InteractiveMessage,
  LocationMessage,
  MediaBase,
  MediaMessage,
  TemplateMessage,
  TextMessage,
  PayloadBase,
} from "./interfaces";
import { ReadMessageResult, sendRequestHelper } from "./sendRequestHelper";

const payloadBase: PayloadBase = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
};
const sendRequest = sendRequestHelper();
const getMediaPayload = (urlOrObjectId: string, options?: MediaBase) => ({
  ...(isURL(urlOrObjectId) ? { link: urlOrObjectId } : { id: urlOrObjectId }),
  caption: options?.caption,
  filename: options?.filename,
});
export const createBot = (): Bot => {
  return {
    readMessage: (payload = {}): ReadMessageResult => {
      // console.log(payload);
      //   switch (type) {
      //       case 'text':
      //           event = PubSubEvents.text;
      //           data = { text: rest.text?.body };
      //           break;
      //
      //       case 'image':
      //       case 'document':
      //       case 'audio':
      //       case 'video':
      //       case 'sticker':
      //       case 'location':
      //       case 'contacts':
      //           event = PubSubEvents[type as PubSubEvent];
      //           data = rest[type];
      //           break;
      //
      //       case 'interactive':
      //           event = rest.interactive.type;
      //           data = {
      //               ...(rest.interactive.list_reply || rest.interactive.button_reply),
      //           };
      //           break;
      //
      //       default:
      //           break;
      //   }

      const whatsAppId =
        payload.entry[0].changes[0].value.metadata.phone_number_id;

      const phoneNumber = payload.entry[0].changes[0].value.messages[0].from;

      const message = payload.entry[0].changes[0].value.messages[0].text?.body;

      const name =
        payload.entry[0].changes[0].value.contacts?.[0]?.profile?.name;

      const user = {
        phoneNumber,
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
