// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { createTransport } = require('nodemailer');
const fetch = require('node-fetch');

const RECAPTCH_MINIMUM_SCORE = 0.5;

const checkRecaptchaToken = (token) =>
  fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTHA_SERVER}&response=${token}`
  )
    .then((res) => res.json())
    .then((response) => response);

export default async (req, res) => {
  if (!req.body) return res.status(402).json({ message: 'No fields provided' });
  req.body = JSON.parse(req.body);
  const { name, email, message } = req.body;

  const response = await checkRecaptchaToken(req.body['g-recaptcha-response']);

  if (!response.success || response.score < RECAPTCH_MINIMUM_SCORE) {
    return res
      .status(500)
      .json({ message: "Couldn't send the email, try again later" });
  }

  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: process.env.CONTACT_EMAIL,
    to: 'ruipedrosilva.1998@gmail.com',
    subject: `${name} - ${email}`,
    text: message,
  };

  return await transporter.sendMail(options, (err) => {
    if (!err) {
      return res.status(200).json({ message: 'Email sent successfully' });
    }
    return res
      .status(500)
      .json({ message: "Couldn't send the email, try again later" });
  });
};
