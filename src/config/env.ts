import "dotenv/config";

const {
  APP_PORT,
  APP_ACCESS_TOKEN,
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_PHONE_ID,
  WHATSAPP_API_URL,
  WHATSAPP_API_VERSION,
} = process.env;

// TO-DO написать валидатор  env перменных

export default Object.freeze({
  APP_PORT,
  APP_ACCESS_TOKEN,
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_PHONE_ID,
  WHATSAPP_API_URL,
  WHATSAPP_API_VERSION,
});
