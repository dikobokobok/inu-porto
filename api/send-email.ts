import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  // Setup transporter
  // ponytail: Gmail SMTP configuration using environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  const mailOptions = {
    from: email,
    to: 'ibnunurramadani@gmail.com',
    subject: `New Message from ${email}`,
    text: `-------[ MESSAGE ]-------\nFrom: ${email}\nMessage: ${message}\n----------------------------------\nemail from: https://inu-porto.vercel.app/`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}