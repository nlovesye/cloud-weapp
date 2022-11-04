import Router from "koa-router";
import PublicController from "../api/publicController";

const router = new Router();

router.prefix("/public");

router.get("/test", PublicController.test);
router.get("/getCaptcha", PublicController.getCaptcha);

export default router;
