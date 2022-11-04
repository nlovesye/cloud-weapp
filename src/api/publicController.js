import svgCaptcha from "svg-captcha";
import { createResult } from "@/utils";

class PublicController {
  constructor() {}

  async test(ctx) {
    const { name } = ctx.request.query;
    ctx.body = createResult({ data: name || "visitor" });
  }

  async getCaptcha(ctx) {
    const { sid } = ctx.request.query;
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: "0o1il",
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 38,
      fontSize: 36,
    });
    // 图片验证码数据超时10分钟
    // await setValue(sid, captcha.text, 10 * 60);
    ctx.body = createResult({ data: captcha });
  }
}

export default new PublicController();
