import * as nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  // 1 - Create transporter(service which i will send email throw it And we have many services we can use  - like [gmail, mailgun, mailtrap, sendgrid])
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
  //   secure: true,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "stuart72@ethereal.email",
      pass: "U63vC5ubZyxYTaVxn5",
    },
  });

  // 2 - define email options .. like [from , to, subject, emailContent]
  const mailOptions = {
    from: "E-shop App <Ziad El-fakhrany>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3 - send email

  await transporter.sendMail(mailOptions);
};
