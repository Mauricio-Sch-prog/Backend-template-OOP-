import nodemailer from "nodemailer";
import env from "../config/cleanEnv.js";
import mailContent from "./mailContent.js";


class EmailProvider {
  constructor () {
    this.transporter = nodemailer.createTransport({
      host: env.MAILTRAP_SMTP_HOST,
      port: env.MAILTRAP_SMTP_PORT,
      auth:{
        user: env.MAILTRAP_SMTP_USER,
        pass: env.MAILTRAP_SMTP_PASS
      }
    });
  }

  async sendVerificationEmail (user) {
    const { emailTextual, emailHtml } = mailContent.verificationEmailContent();
    
    const mailOptions = {
      from: "mauricio.ass.2016@gmail.com",
      to: user.email,
      subject: `Welcome, ${user.username}!`,
      text: emailTextual,
      html: emailHtml,
    };
    
    return await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordReset (user, token) {
    // ... logic for reset email
  }
}

export default new EmailProvider();