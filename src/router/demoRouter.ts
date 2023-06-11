import Router from 'koa-router';
import DemoController from '@/api/DemoController';

const router = new Router();

router.prefix('/api/demo');

router.get('/', DemoController.get);
router.post('/', DemoController.add);
router.put('/', DemoController.update);
router.delete('/', DemoController.delete);
router.post('/clear', DemoController.clear);

export default router;
