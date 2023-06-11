import { isProd } from '@/config';
import { AppContext, AppStatusEnum } from '@/model';
import { errorLogger, genAppResponseBodyT } from '@/util';
import { Middleware } from 'koa';
import { AppState, AppResponseBodyT } from '../model/index';

export const errorHandle: Middleware<AppState, AppContext, AppResponseBodyT> = async function (
    ctx,
    next,
) {
    return next().catch((error) => {
        if (AppStatusEnum.UN_AUTHORIZATION === error.status) {
            ctx.status = AppStatusEnum.UN_AUTHORIZATION;
            ctx.body = genAppResponseBodyT({
                status: AppStatusEnum.UN_AUTHORIZATION,
                message: 'Protected resource, use Authorization header to get access\n',
            });
        } else {
            errorLogger.error(error);
            const status = error.status || AppStatusEnum.FAIL;
            ctx.status = status;
            ctx.body = Object.assign(
                genAppResponseBodyT({
                    status,
                    message: error.message || 'fail',
                }),
                !isProd ? { stack: error.stack } : {},
            );
        }
    });
};
