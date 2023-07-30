import axios, { AxiosError } from "axios";
import env from "../../../../../config/env";

const {
  WHATSAPP_PHONE_ID,
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_API_URL,
  WHATSAPP_API_VERSION,
} = env;

const defaultPayload = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
};
const headers = {
  Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const sendRequest = async <T>(payload: T) => {
  try {
    // https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages
    return axios({
      method: "post",
      url: `${WHATSAPP_API_URL}/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`,
      data: { ...defaultPayload, ...payload },
      headers,
    });

    // const res = data;

    // return {
    //   messageId: res.messages?.[0]?.id,
    //   phoneNumber: res.contacts?.[0]?.input,
    //   whatsAppId: res.contacts?.[0]?.wa_id,
    // };
  } catch (err: unknown) {
    if ((err as any).response) {
      throw (err as AxiosError)?.response?.data;
      // } else if ((err as any).request) {
      //   throw (err as AxiosError)?.request;
    } else if (err instanceof Error) {
      throw (err as Error).message;
    } else {
      throw err;
    }
  }
};
