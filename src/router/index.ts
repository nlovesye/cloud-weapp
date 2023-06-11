import combineRouters from 'koa-combine-routers';
import demoRouter from './demoRouter';
import userRouter from './userRouter';
import publicRouter from './publicRouter';
import uploadRouter from './uploadRouter';

const router = combineRouters(demoRouter, userRouter, publicRouter, uploadRouter);

export default router;
