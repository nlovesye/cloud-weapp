// import fs from "fs";

// import { resolve } from "@config/util";
// import { ApplicationContext } from "@/model";
// import { genAppResponseBodyT } from "@/util";

class UploadController {
    // constructor() {}
    // async index(ctx: ApplicationContext) {
    //     const file = ctx.request.files.file; // 获取上传文件
    //     // 创建可读流
    //     const reader = fs.createReadStream(file.filepath);
    //     const fileName = `${Date.now()}`;
    //     const filePath = resolve("public", fileName);
    //     // 创建可写流
    //     const upStream = fs.createWriteStream(filePath);
    //     // 可读流通过管道写入可写流
    //     reader.pipe(upStream);
    //     ctx.body = genAppResponseBodyT({
    //         // data: `${staticUrl}/${fileName}`,
    //         data: "xxx",
    //         message: "上传成功！",
    //     });
    // }
}

export default new UploadController();
