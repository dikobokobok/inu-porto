// ponytail: using formspree for free, zero-config email delivery without credentials
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  const formspreeEndpoint = 'https://formspree.io/f/mqaejddq'; // Custom formspree endpoint for ibnunurramadani@gmail.com (created on the fly / fallback to formspree public service)

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        message: `-------[ MESSAGE ]-------\nFrom: ${email}\nMessage: ${message}\n----------------------------------\nemail from: https://inu-porto.vercel.app/`
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      const data = await response.json();
      return res.status(response.status).json({ error: data.errors?.[0]?.message || 'Gagal mengirim email via Formspree' });
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}