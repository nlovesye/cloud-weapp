import Koa from 'koa';
import koaCompress from 'koa-compress';
import compose from 'koa-compose';
import koaCors from '@koa/cors';
import koaBody from 'koa-body';
import koaRange from 'koa-range';
import koaJson from 'koa-json';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
// import koaStatic from "koa-static";
import koaHelmet from 'koa-helmet';
// import koaJwt from "koa-jwt";
// import path from "path";

import { isProd, SERVER_CONFIG } from '@/config';
import { errorHandle, logErrorHandle, logHandle } from './middleware';
// import { AppContext, AppState } from './model';
import router from './router';
import { appLogger } from './util';

const { PORT, UPLOAD_MAX_FILE_SIZE, HOST } = SERVER_CONFIG;

const app = new Koa();

if (isProd) {
    app.use(koaCompress());
}

const whiteList = ['/api', '/public'];

const middleware = compose([
    errorHandle,
    logHandle,
    koaCors(),
    koaBody({
        multipart: true,
        formidable: {
            maxFileSize: UPLOAD_MAX_FILE_SIZE, // 设置上传文件大小最大限制
        },
    }),
    koaJson({ pretty: false, param: 'pretty' }),
    koaRange,
    // 此中间件需在静态服务器中间件前使用，whiteList（白名单）中的路由不会被指向到打包应用的**index.html**文件。
    historyApiFallback({ whiteList }),
    // koaStatic(path.join(__dirname, "../public")),
    koaHelmet(),
    // koaJwt({ secret: JWT_SECRET }).unless({
    //     path: [/^\/public/, /^\/user\/login/, /^\/user\/reg/],
    // }),
    router(),
]);

app.use(middleware);

// error-handling
app.on('error', logErrorHandle);

app.listen(PORT, () => {
    appLogger.log(`Running on http://${HOST}:${PORT}`);
    appLogger.log('isProd: ', isProd);
    appLogger.log('SERVER_CONFIG: ', SERVER_CONFIG);
});
