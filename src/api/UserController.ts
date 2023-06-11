// import moment from "moment";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// import { createResult } from "@/utils";
// import { JWT_SECRET } from "@/config";
// import sendMail from "@/config/MailConfig";
// import { checkCode } from "@/utils";
// import User from "@/model/User";

class UserController {
    //   constructor() {}
    //   async getUserInfo(ctx) {
    //     let { body } = ctx.request;
    //     if (
    //       !body ||
    //       typeof body.name === "undefined" ||
    //       typeof body.email === "undefined"
    //     ) {
    //       ctx.status = 404;
    //       ctx.body = createResult({
    //         code: 404,
    //         msg: "name与email不得为空",
    //       });
    //       return;
    //     } else {
    //       if (
    //         typeof ctx.header.role !== "undefined" &&
    //         ctx.header.role === "admin"
    //       ) {
    //         ctx.body = createResult({ data: { ...body }, msg: "上传成功" });
    //         return;
    //       } else {
    //         ctx.status = 401;
    //         ctx.body = createResult({
    //           code: 401,
    //           msg: "unauthorized post",
    //         });
    //       }
    //     }
    //   }
    //   async forget(ctx) {
    //     try {
    //       const {
    //         body: { code, email, userName },
    //       } = ctx.request;
    //       const expire = moment().add(30, "minutes").format("YYYY-MM-DD HH:mm:ss");
    //       const sendInfo = {
    //         code,
    //         expire,
    //         email,
    //         user: userName,
    //       };
    //       const result = await sendMail(sendInfo);
    //       ctx.body = createResult({
    //         data: result,
    //         msg: "邮件发送成功",
    //       });
    //     } catch (error) {
    //     }
    //   }
    //   // 登录
    //   async login(ctx) {
    //     const { username, password, code, sid } = ctx.request.body;
    //     const isCodePass = await checkCode(sid, code);
    //     if (!isCodePass) {
    //       ctx.status = 401;
    //       ctx.body = createResult({ code: 401, msg: "验证码错误" });
    //       return;
    //     }
    //     const user = await User.findOne({ username });
    //     if (!user || !bcrypt.compare(password, user.password)) {
    //       ctx.status = 401;
    //       ctx.body = createResult({ code: 401, msg: "用户名或密码不正确" });
    //       return;
    //     }
    //     const token = jwt.sign(
    //       {
    //         data: "userId",
    //       },
    //       JWT_SECRET,
    //       { expiresIn: "1d" }
    //     );
    //     ctx.body = createResult({
    //       data: token,
    //       msg: "登录成功",
    //     });
    //   }
    //   // 注册
    //   async reg(ctx) {
    //     const { username, nickName, password, code, sid } = ctx.request.body;
    //     const isCodePass = await checkCode(sid, code);
    //     if (!isCodePass) {
    //       ctx.status = 401;
    //       ctx.body = createResult({ code: 401, msg: "验证码已失效，请重新获取" });
    //       return;
    //     }
    //     let user = await User.findOne({ username });
    //     if (user && username === user.username) {
    //       ctx.status = 500;
    //       ctx.body = createResult({ code: 500, msg: "用户名已被使用" });
    //       return;
    //     }
    //     user = await User.findOne({ nickName });
    //     if (user && nickName === user.nickName) {
    //       ctx.status = 500;
    //       ctx.body = createResult({ code: 500, msg: "昵称已被使用" });
    //       return;
    //     }
    //     const bcryptPassword = await bcrypt.hash(password, 5);
    //     const newUser = new User({
    //       username,
    //       nickName,
    //       password: bcryptPassword,
    //       created: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     });
    //     const result = await newUser.save();
    //     ctx.body = createResult({ data: result, msg: "注册成功" });
    //   }
}

export default new UserController();
