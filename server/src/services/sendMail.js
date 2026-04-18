import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  // port:465,
  // secure:true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

const sendMail = async ({ to, subject, html }) => {
  try {
    return await transporter.sendMail({
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log("error in sendMail - ", error);
  }
};

export default sendMail;
