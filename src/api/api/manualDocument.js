const router = require("koa-router")();
const { db, res } = require("../../utils");

router.prefix("/api/manualDocument");

const jsonName = "manualDocument";

// 清空数据
router.get(`/clear`, async (ctx) => {
  db.clear(jsonName);
  ctx.body = res.success("success");
});

// 获取列表数据
router.get(`/`, async (ctx) => {
  const list = db.findJson(jsonName);
  if (list) {
    const { cabinetId } = ctx.request.query;
    const result = list.filter((o) =>
      cabinetId ? `${o.cabinetId}` === `${cabinetId}` : true
    );
    ctx.body = res.success(result);
  } else {
    ctx.body = res.success([]);
  }
});

// 新增文档
router.post("/", async (ctx) => {
  const req = ctx.request.body;

  const data = { ...req, documentId: Math.random() };
  const rt = db.insert(jsonName, data);
  ctx.body = res.success(rt);
});

// 更新文档
router.put("/", async (ctx) => {
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

// 删除文档
router.delete("/", async (ctx) => {
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
