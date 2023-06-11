'use strict';
import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export default async function send(sendInfo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  const mailUser = '894765963@qq.com';
  const mailPassCode = 'dglgztybfidubbga-xxxxx';

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailUser, // generated ethereal user
      pass: mailPassCode, // generated ethereal password
    },
  });

  // const sendInfo = {
  //   code: "1234",
  //   expire: "2022-10-01",
  //   email: "894765963@qq.com",
  //   user: "ns",
  // };

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"认证邮件 👻" <894765963@qq.com>', // sender address
    to: sendInfo.email, // list of receivers
    subject: `Hello ✔ ${sendInfo.user}`, // Subject line
    text: `您的邀请码是 ${sendInfo.code} ，邀请码的过期时间： ${sendInfo.expire}`, // plain text body
    html: `<b>您的邀请码是 ${sendInfo.code} ，邀请码的过期时间： ${sendInfo.expire}</b>`, // html body
  });

  return `Message sent: ${info.messageId}`;
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
