import axios, { AxiosError } from "axios";
import env from "../../../../config/env";

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

export interface SendMessageResult {
  messageId: string;
  phoneNumber: string;
  whatsappId: string;
}

const {
  WHATSAPP_PHONE_ID,
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_WEBHOOK_TOKEN,
  WHATSAPP_API_URL,
  WHATSAPP_API_VERSION,
} = env;
export const sendRequestHelper =
  () =>
  async <T>(data: T): Promise<SendMessageResult> => {
    try {
      // https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages
      const { data: rawResult } = await axios({
        method: "post",
        url: `${WHATSAPP_API_URL}/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`,
        data,
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const result = rawResult as OfficialSendMessageResult;

      return {
        messageId: result.messages?.[0]?.id,
        phoneNumber: result.contacts?.[0]?.input,
        whatsappId: result.contacts?.[0]?.wa_id,
      };
    } catch (err: unknown) {
      if ((err as any).response) {
        throw (err as AxiosError)?.response?.data;
        // } else if ((err as any).request) {
        //   throw (err as AxiosError)?.request;
      } else if (err instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw (err as Error).message;
      } else {
        throw err;
      }
    }
  };
