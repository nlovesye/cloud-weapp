import { createResult } from "@/utils/result";

export default async (ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = createResult({
        code: 401,
        msg: "Protected resource, use Authorization header to get access\n",
      });
    } else {
      const code = err.status || 500;
      ctx.status = code;
      ctx.body = Object.assign(
        createResult({ code, msg: err.message }),
        process.env.NODE_ENV === "development" ? { stack: err.stack } : {}
      );
    }
  });
};
