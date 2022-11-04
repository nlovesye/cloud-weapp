const SERVER_HOST = "nlovesye.tpddns.cn";

const isProdMode = process.env.NODE_ENV === "production";

const API_LISTENING_PORT = isProdMode ? 7800 : 7700;

export { SERVER_HOST, API_LISTENING_PORT };
