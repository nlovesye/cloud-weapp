import { isProd } from '@/config';
import { appLogger, errorLogger, logger, responseLogger } from '@/util';
import { Middleware } from 'koa';
import { AppContext, AppState, AppResponseBodyT } from '@/model';

export const logHandle: Middleware<AppState, AppContext, AppResponseBodyT> = async (ctx, next) => {
    const start = Date.now();
    await next();
    const end: number = Date.now() - start;
    // 生产环境下，使用中间件记录日志，使用appLogger.log打印消息
    // 其他环境下，使用log4js的console打印信息
    if (isProd) {
        responseLogger.info(formatRes(ctx, end));
        appLogger.log(`${ctx.method} ${ctx.url} - ${end}ms`);
    } else {
        logger.info(`${ctx.method} ${ctx.url} - ${end}ms`, ctx.body);
    }
};

export const logErrorHandle = (error: unknown, ctx: AppContext) => {
    if (isProd) {
        errorLogger.error(formatError(ctx, error));
        logger.error(`${ctx.method} ${ctx.url}`, error);
    } else {
        logger.error(`${ctx.method} ${ctx.url}`, error);
    }
};

// 自定义输出格式，确定哪些内容输出到日志文件中
function formatError(ctx: AppContext, err: unknown) {
    const { method, url } = ctx;
    const body = ctx.request.body;
    const user = ctx.state.user;

    // 将请求方法，请求路径，请求体，登录用户，错误信息
    return { method, url, body, user, err };
}

function formatRes(ctx: AppContext, costTime: number) {
    // const { method, url, response: { status, message, body: { success } }, request: { header: { authorization } } } = ctx
    const {
        ip,
        method,
        url,
        response: { status, message },
        request: {
            header: { authorization },
        },
    } = ctx;
    const body = ctx.request.body;
    const user = ctx.state.user;

    // 将请求方法，请求路径，请求体，登录用户，请求消耗时间，请求头中的authorization字段即token，响应体中的状态码，消息，以及自定义的响应状态
    return {
        ip,
        method,
        url,
        body,
        user,
        costTime,
        authorization,
        response: { status, message },
    };
}
