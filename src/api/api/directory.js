const router = require("koa-router")();
const { db, res } = require("../../utils");

router.prefix("/api/directory");

const jsonName = "directory";

const tableMap = new Map();
tableMap.set("0", `${jsonName}-unknow`); // 普通文档
tableMap.set("1", `${jsonName}-manualDocument`); // 普通文档
tableMap.set("2", `${jsonName}-building`); // 楼型文档
tableMap.set("3", `${jsonName}-layoutUnit`); // 户型文档
tableMap.set("4", `${jsonName}-landscape`); // 景观文档

// 清空数据
router.get(`/clear`, async (ctx) => {
  const { cabinetId } = ctx.request.query;
  db.clear(db.findJson(tableMap.get(cabinetId)));
  ctx.body = res.success("success");
});

// 获取tree数据
router.get(`/:cabinetId`, async (ctx) => {
  const { cabinetId } = ctx.params;
  if (!cabinetId) {
    ctx.body = res.error("文档类型错误");
    return;
  }
  const list = db.findJson(tableMap.get(`${cabinetId}`));
  const tree = {
    id: cabinetId,
    label: "",
    parent: cabinetId,
    children: [],
  };
  if (list) {
    tree.children = formatListToTree(list);
    ctx.body = res.success(tree);
  } else {
    ctx.body = res.success(tree);
  }
});

// 新增
router.post("/", async (ctx) => {
  const { parent, label, cabinetId } = ctx.request.body;

  const newNode = createDirectory({
    parent,
    id: Math.random(),
    label,
  });
  const rt = db.insert(tableMap.get(`${cabinetId}`), newNode);
  ctx.body = res.success(rt);
});

// 更新
router.put("/:cabinetId", async (ctx) => {
  const { cabinetId } = ctx.params;
  const { id, label, parent } = ctx.request.body;

  const isExists = db.isExistsOne(
    tableMap.get(`${cabinetId}`),
    (item) => item.id === id
  );
  if (!isExists) {
    ctx.body = res.error("文档不存在");
  } else {
    const rt = db.updateOne(
      tableMap.get(`${cabinetId}`),
      { label, parent },
      (item) => item.id === id
    );
    ctx.body = res.success(rt);
  }
});

// 删除
router.delete("/:cabinetId", async (ctx) => {
  const { cabinetId } = ctx.params;
  const { id } = ctx.request.query;
  const rt = db.removeOne(
    tableMap.get(`${cabinetId}`),
    (item) => `${item.id}` === `${id}`
  );
  if (rt) {
    ctx.body = res.success("删除成功");
  } else {
    ctx.body = res.error("未知错误");
  }
});

module.exports = router;

function createDirectory(obj = {}) {
  return {
    id: 0,
    label: "",
    parent: 0,
    fullPath: "",
    children: [],
    ...obj,
  };
}

function toMap(arr) {
  const result = arr.reduce((acc, current) => {
    acc[current.id] = current;
    return acc;
  }, {});
  return result;
}

function formatListToTree(arr) {
  const map = toMap(arr);
  return arr.reduce((acc, current) => {
    const { id, parent } = current;
    if (map[parent]) {
      map[parent].children = map[parent].children || [];
      map[parent].children.push(current);
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}
