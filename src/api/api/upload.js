const router = require("koa-router")();
const path = require("path");
const fs = require("fs");

router.prefix("/api/upload");

const staticUrl = "http://10.0.2.94:7700/upload/";

// 上传单个文件
router.post("/", async (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  const fileName = `${Date.now()}-${file.name}`;

  const filePath = path.join(__dirname, "../../public/upload") + `/${fileName}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);

  return (ctx.body = {
    msg: "上传成功！",
    url: `${staticUrl}/${fileName}`,
  });
});

// 上传多个文件
router.post("/patch", async (ctx, next) => {
  const files = ctx.request.files.file; // 获取上传文件
  for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, "public/upload/") + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
  return (ctx.body = {
    msg: "上传成功！",
  });
});

module.exports = router;
