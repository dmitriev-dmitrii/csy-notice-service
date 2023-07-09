export default {
  transform: true, // преобразовывает примитивы в params запросов если может  /:id  '1' => 1
  disableErrorMessages: process.env.NODE_ENV === "PRODUCTION",
  // whitelist: true,
  // forbidNonWhitelisted: true,
};
