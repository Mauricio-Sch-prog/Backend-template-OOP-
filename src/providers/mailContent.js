import Mailgen from "mailgen";

class mailContent {
  constructor (options) {
    this.mailGenerator = new Mailgen(options);
  }

  verificationEmailContent (username, verificationUrl) {
    const content = {
      body: {
        name: username,
        intro: "Welcome to MY app! I'm sure you're gonna enjoy it",
        action: {
          instructions:
          "Wanna verify your email? then click on the following button",
          button: {
            color: "#1a1a1a",
            text: "Verify email",
            link: verificationUrl,
          },
        },
      },
      outro: "need help? reply to this email and I might possibly reply to you",
    };

    const emailTextual = this.mailGenerator.generatePlaintext(content);
    const emailHtml = this.mailGenerator.generate(content);

    return { emailTextual, emailHtml };
  }
  
  forgotPasswordMailgenContent (username, forgotPasswordUrl) {
    const content = {
      body: {
        name: username,
        intro: "I got a password reset request for your account",
        action: {
          instructions:
          "Wanna reset your password? then click on the following button",
          button: {
            color: "#f8b117",
            text: "Reset password",
            link: forgotPasswordUrl, 
          },
        },
      },
      outro: "need help? reply to this email and I might possibly reply to you",
    };

    const emailTextual = this.mailGenerator.generatePlaintext(content);
    const emailHtml = this.mailGenerator.generate(content);

    return { emailTextual, emailHtml };
  }

  
}

export default new mailContent({
  theme: "default",
  product: {
    name: "OPP Tempalte",
    link: "http://wemaketemplates.com"
  }
});