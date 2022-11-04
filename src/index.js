import Koa from "koa";
import path from "path";
import helmet from "koa-helmet";
import statics from "koa-static";
import koaBody from "koa-body";
import jsonUtil from "koa-json";
import cors from "@koa/cors";
import compose from "koa-compose";
import compress from "koa-compress";
import logger from "koa-logger";

import router from "./routes";
import { API_LISTENING_PORT } from "./config";
import errorHandle from "./middleware/ErrorHandle";

const app = new Koa();

const isDevMode = process.env.NODE_ENV !== "production";

const middleware = compose([
  logger(),
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 102400 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  }),
  statics(path.join(__dirname, "../public")),
  cors(),
  jsonUtil({ pretty: false, param: "pretty" }),
  helmet(),
  errorHandle,
]);

if (!isDevMode) {
  app.use(compress());
}

app.use(middleware);
app.use(router());

// listening
app.listen(API_LISTENING_PORT, () => {
  console.log(`>>> RESTFUL API listening on port: ${API_LISTENING_PORT}`);
});
