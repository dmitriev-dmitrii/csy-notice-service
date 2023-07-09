import "dotenv/config";

const {
  APP_PORT,
  WHATSAPP_PHONE_ID,
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_WEBHOOK_TOKEN,
} = process.env;

export default Object.freeze({
  APP_PORT,
  WHATSAPP_PHONE_ID,
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_WEBHOOK_TOKEN,
});
