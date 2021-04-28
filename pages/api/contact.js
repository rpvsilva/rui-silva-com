// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { createTransport } = require('nodemailer');

export default async (req, res) => {
  if(!req.body) return res.status(402).json({ message: 'No fields provided' });
  const { name, email, message } = JSON.parse(req.body);
  
  const transporter = createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const options = {
    from: process.env.CONTACT_EMAIL,
    to: 'ruipedrosilva.1998@gmail.com',
    subject: `${name} - ${email}`,
    text: message
  };

  return await transporter.sendMail(options, (err, info) => {
    if(!err) {
      return res.status(200).json({ message: 'Email sent successfully' });
    }
    return res.status(500).json({ message: 'Couldn\'t send the email, try again later' })
  })
};
