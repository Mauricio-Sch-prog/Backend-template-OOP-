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

  async sendVerificationEmail (user, token) {
    const verificationURL = `${env.HOST}${env.PORT}/auth/verify-email/${token}`;
    const { emailTextual, emailHtml } = mailContent.verificationEmailContent(
      user.username,
      verificationURL
    );
    
    const mailOptions = {
      from: "mauricio.ass.2016@gmail.com",
      to: user.email,
      subject: `Welcome, ${user.username}!`,
      text: emailTextual,
      html: emailHtml,
    };
    
    return await this.transporter.sendMail(mailOptions);
  }

  async sendForgotPasswordEmail (user, token) {
    const changePasswordURL = `${env.HOST}${env.PORT}/auth/change-password/${token}`;
    const { emailTextual, emailHtml } = mailContent.forgotPasswordMailgenContent(
      user.username,
      changePasswordURL
    );
    const mailOptions = {
      from: "mauricio.ass.2016@gmail.com",
      to: user.email,
      subject: "Change password request",
      text: emailTextual,
      html: emailHtml,
    };
    
    return await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailProvider();