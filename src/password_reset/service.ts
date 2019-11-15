import nodemailer from 'nodemailer'
export default class {
  constructor() { }

  async sendPasswordResetEmail(email: string, token: string) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sprightfuldashboard@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    });

    let body = `<p>SportsFinder password reset link: ${process.env.CLIENT_URL}/password_reset?email=${email}&token=${token}</p>`
    let mailOptions = {
      from: 'sprightfuldashboard@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: body
    };

    await transporter.sendMail(mailOptions).then((res) => {
      console.log("Email sent. ", res)
    }).catch(err => {
      console.log("Error sending email ", err)
    })
  }
}