import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: process.env.EMAIL_SMTP_PORT,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
  secure: process.env.NODE_ENV === "production" ? true : false,
});

console.log(
  process.env.EMAIL_SMTP_HOST,
  process.env.EMAIL_SMTP_PORT,
  process.env.EMAIL_SMTP_USER,
  process.env.EMAIL_SMTP_PASSWORD,
);
async function send(mailOptions) {
  await transporter.sendMail(mailOptions);
}
const email = {
  send,
};

export default email;
