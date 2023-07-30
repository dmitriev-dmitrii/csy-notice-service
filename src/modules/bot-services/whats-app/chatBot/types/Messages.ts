// https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages

import { Contact } from "./Contact";
export enum WhatsAppMessagesType {
  MESSAGE = "message",
  TEST = "text",
  IMAGE = "image",
  DOCUMENT = "document",
  AUDIO = "audio",
  VIDEO = "video",
  STICKER = "sticker",
  LOCATION = "location",
  CONTACTS = "contacts",
  BUTTON_REPLY = "button_reply",
  LIST_REPLY = "list_reply",
}
export const enum MessageStatus {
  READ = "read",
  SENT = "sent",
  DELIVERED = "delivered",
  FAILED = "failed",
}

export interface Message {
  from: string;
  name: string | undefined;
  id: string;
  timestamp: string;
  type: WhatsAppMessagesType;
  data: object; // там куча дерьма не стал описывать типы
}
export interface SendMessageResult {
  messageId: string;
  phoneNumber: string;
  whatsAppId: string;
}
export interface markMessageAsReadResult {
  success: boolean;
}
export interface ParseMessageResult {
  message: {
    id: string | number;
    text: string;
    status: MessageStatus;
  };
  user: {
    phoneNumber: string;
    whatsAppId: string;
    name: string;
  };
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
