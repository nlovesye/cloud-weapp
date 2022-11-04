const router = require("koa-router")();
const { db, res } = require("../../utils");
const { generateId } = require("../../utils/util");

router.prefix("/api/landscape");

const jsonName = "landscape";

// 清空数据
router.get(`/clear`, async (ctx) => {
  db.clear(jsonName);
  ctx.body = res.success("success");
});

// 获取景观列表数据
router.get(`/document/list`, async (ctx) => {
  const rt = db.findJson(jsonName);
  if (rt) {
    ctx.body = res.success(rt);
  } else {
    ctx.body = res.success([]);
  }
});

// 新增景观文档
router.post("/document", async (ctx) => {
  const req = ctx.request.body;

  const data = { ...req, documentId: generateId() };
  const rt = db.insert(jsonName, data);
  ctx.body = res.success(rt);
});

// 更新景观文档
router.put("/document", async (ctx) => {
  const req = ctx.request.body;

  const isExists = db.isExistsOne(
    jsonName,
    (item) => item.documentId === req.documentId
  );
  if (!isExists) {
    ctx.body = res.error("文档不存在");
  } else {
    const rt = db.updateOne(
      jsonName,
      req,
      (item) => item.documentId === req.documentId
    );
    ctx.body = res.success(rt);
  }
});

// 删除景观文档
router.delete("/document", async (ctx) => {
  const { documentId } = ctx.request.query;
  const rt = db.removeOne(
    jsonName,
    (item) => `${item.documentId}` === `${documentId}`
  );
  if (rt) {
    ctx.body = res.success("删除成功");
  } else {
    ctx.body = res.error("未知错误");
  }
});

module.exports = router;
