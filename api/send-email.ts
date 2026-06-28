import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  const formSubmitEndpoint = 'https://formsubmit.co/ajax/ibnunurramadani175@gmail.com';

  try {
    const response = await fetch(formSubmitEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        message: message,
        _subject: `New Message from ${email} (inu-porto)`,
        _template: 'table'
      })
    });

    const text = await response.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch (e) {
      // ignore
    }

    if (response.ok && (data.success === 'true' || data.success === true)) {
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      return res.status(response.status || 400).json({ error: data.message || 'Gagal mengirim email via FormSubmit' });
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}