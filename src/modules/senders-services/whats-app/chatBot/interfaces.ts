import type { RequireAtLeastOne } from "type-fest";
import { FreeFormObject } from "./utils/misc";
import { PubSubEvent } from "./utils/pubSub";
export interface PayloadBase {
  messaging_product: "whatsapp";
  recipient_type: "individual";
}

export interface Message {
  from: string;
  name: string | undefined;
  id: string;
  timestamp: string;
  type: PubSubEvent;
  data: FreeFormObject;
}

// https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages

interface ContactName {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  suffix?: string;
  prefix?: string;
}

export interface Contact {
  addresses?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: "HOME" | "WORK";
  }[];
  birthday?: string; // YYYY-MM-DD
  emails?: {
    email?: string;
    type: "HOME" | "WORK";
  }[];
  name: {
    formatted_name: string;
  } & RequireAtLeastOne<
    ContactName,
    "first_name" | "last_name" | "middle_name" | "prefix" | "suffix"
  >;
  org?: {
    company?: string;
    department?: string;
    title?: string;
  };
  phones?: {
    phone?: string;
    type?: "CELL" | "MAIN" | "IPHONE" | "HOME" | "WORK";
    wa_id?: string;
  }[];
  urls?: {
    url?: string;
    type?: "HOME" | "WORK";
  }[];
}

interface InteractiveHeaderText {
  type: "text";
  text: string;
}

interface InteractiveHeaderVideo {
  type: "video";
  video: Media;
}

interface InteractiveHeaderImage {
  type: "image";
  image: Media;
}

interface InteractiveHeaderDocument {
  type: "document";
  document: Media;
}

export type InteractiveHeader =
  | InteractiveHeaderText
  | InteractiveHeaderVideo
  | InteractiveHeaderImage
  | InteractiveHeaderDocument;

export interface InteractiveBase {
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header?: InteractiveHeader;
}

export interface InteractiveReplyButton {
  type: "button";
  action: {
    buttons: {
      type: "reply";
      reply: {
        title: string | number;
        id: string;
      };
    }[];
  };
}

export interface InteractiveListMessage {
  type: "list";
  action: {
    button: string;
    sections: {
      title: string;
      rows: {
        id: string | number;
        title: string | number;
        description?: string;
      }[];
    }[];
  };
}

type Interactive = InteractiveBase &
  (InteractiveReplyButton | InteractiveListMessage);

export interface Location {
  longitude: number;
  latitude: number;
  name?: string;
  address?: string;
}

export interface MediaWithId {
  id: string;
}

export interface MediaWithLink {
  link: string; // http/https
}

export interface MediaBase {
  caption?: string;
  filename?: string;
}

export type Media = MediaBase & (MediaWithId | MediaWithLink);

interface ParameterText {
  type: "text";
  text: string;
}

interface ParameterCurrency {
  type: "currency";
  fallback_value: string;
  code: string;
  amount_1000: number;
}

interface ParameterDateTime {
  type: "date_time";
  fallback_value: string;
}

interface ParameterImage {
  type: "image";
  image: Media;
}

interface ParameterDocument {
  type: "document";
  document: Media;
}

interface ParameterVideo {
  type: "video";
  video: Media;
}

interface TemplateComponentTypeHeader {
  type: "header";
}

interface TemplateComponentTypeBody {
  type: "body";
  parameters: (
    | ParameterText
    | ParameterCurrency
    | ParameterDateTime
    | ParameterImage
    | ParameterDocument
    | ParameterVideo
  )[];
}

interface TemplateComponentTypeButtonQuickReply {
  sub_type: "quick_reply";
  parameters: {
    type: "payload" | "text";
    payload: any;
    text: string;
  }[];
}

interface TemplateComponentTypeButtonUrl {
  sub_type: "url";
  parameters: {
    type?: "payload" | "text";
    payload?: any;
    text: string;
  }[];
}

interface TemplateComponentTypeButtonBase {
  type: "button";
  index: 0 | 1 | 2;
}

type TemplateComponentTypeButton = TemplateComponentTypeButtonBase &
  (TemplateComponentTypeButtonQuickReply | TemplateComponentTypeButtonUrl);

export type TemplateComponent =
  | TemplateComponentTypeHeader
  | TemplateComponentTypeBody
  | TemplateComponentTypeButton;

export interface Template {
  name: string;
  language: {
    policy?: "deterministic";
    code: string; // https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages
  };
  components?: TemplateComponent[];
}
export interface DefaultMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
}
export interface Text {
  body: string;
  preview_url?: boolean;
}

export interface AudioMessage extends DefaultMessage {
  type: "audio";
  audio: Media;
}

export interface ContactMessage extends DefaultMessage {
  type: "contacts";
  contacts: Contact[];
}

export interface DocumentMessage extends DefaultMessage {
  type: "document";
  document: Media;
}

export interface ImageMessage extends DefaultMessage {
  type: "image";
  image: Media;
}

export interface InteractiveMessage extends DefaultMessage {
  type: "interactive";
  interactive: Interactive;
}

export interface LocationMessage extends DefaultMessage {
  type: "location";
  location: Location;
}

export interface StickerMessage extends DefaultMessage {
  type: "sticker";
  sticker: Media;
}

export interface TemplateMessage extends DefaultMessage {
  type: "template";
  template: Template;
}

export interface TextMessage extends DefaultMessage {
  type: "text";
  text: Text;
}

export interface VideoMessage extends DefaultMessage {
  type: "video";
  video: Media;
}

export type MediaMessage =
  | AudioMessage
  | DocumentMessage
  | ImageMessage
  | StickerMessage
  | VideoMessage;

import { SendMessageResult, ReadMessageResult } from "./sendRequestHelper";

export interface Bot {
  readMessage: (payload: any) => ReadMessageResult;
  sendText: (
    to: string,
    text: string,
    options?: {
      preview_url?: boolean;
    }
  ) => Promise<SendMessageResult>;
  sendMessage: (
    to: string,
    text: string,
    options?: {
      preview_url?: boolean;
    }
  ) => Promise<SendMessageResult>;
  sendImage: (
    to: string,
    urlOrObjectId: string,
    options?: {
      caption?: string;
    }
  ) => Promise<SendMessageResult>;
  sendDocument: (
    to: string,
    urlOrObjectId: string,
    options?: {
      caption?: string;
      filename?: string;
    }
  ) => Promise<SendMessageResult>;
  sendAudio: (to: string, urlOrObjectId: string) => Promise<SendMessageResult>;
  sendVideo: (
    to: string,
    urlOrObjectId: string,
    options?: {
      caption?: string;
    }
  ) => Promise<SendMessageResult>;
  sendSticker: (
    to: string,
    urlOrObjectId: string
  ) => Promise<SendMessageResult>;
  sendLocation: (
    to: string,
    latitude: number,
    longitude: number,
    options?: {
      name?: string;
      address?: string;
    }
  ) => Promise<SendMessageResult>;
  sendTemplate: (
    to: string,
    name: string,
    languageCode: string,
    components?: TemplateComponent[]
  ) => Promise<SendMessageResult>;
  sendContacts: (to: string, contacts: Contact[]) => Promise<SendMessageResult>;
  sendReplyButtons: (
    to: string,
    bodyText: string,
    buttons: {
      [id: string]: string | number;
    },
    options?: {
      footerText?: string;
      header?: InteractiveHeader;
    }
  ) => Promise<SendMessageResult>;
  sendList: (
    to: string,
    buttonName: string,
    bodyText: string,
    sections: {
      [sectionTitle: string]: {
        id: string | number;
        title: string | number;
        description?: string;
      }[];
    },
    options?: {
      footerText?: string;
      header?: InteractiveHeader;
    }
  ) => Promise<SendMessageResult>;
}
