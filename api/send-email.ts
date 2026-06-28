import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  // ponytail: use standard application/x-www-form-urlencoded format for FormSubmit.co ajax endpoint
  const formSubmitEndpoint = 'https://formsubmit.co/ajax/ibnunurramadani175@gmail.com';

  try {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('message', message);
    formData.append('_subject', `New Message from ${email} (inu-porto)`);

    const response = await fetch(formSubmitEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData.toString()
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