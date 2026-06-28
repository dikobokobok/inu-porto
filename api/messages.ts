import type { VercelRequest, VercelResponse } from '@vercel/node';

// Emulate persistent database
let messagesDb: any[] = [
  {
    id: "1",
    email: "system@example.com",
    message: "Welcome to your admin panel!",
    timestamp: new Date().toISOString(),
    replies: []
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow Vercel domain or local development (strictly restrict CORS)
  const origin = req.headers.origin;
  const allowedOrigins = ['https://inu-porto.vercel.app', 'http://localhost:5173', 'http://127.0.0.1:5173'];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://inu-porto.vercel.app');
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Authorization check using env vars (fallback to hardcoded for local dev only)
  const authHeader = req.headers.authorization;
  const adminUser = process.env.ADMIN_USERNAME || 'ibnu';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  const isAdmin = authHeader === 'Basic ' + Buffer.from(`${adminUser}:${adminPass}`).toString('base64');

  // GET: Fetch all messages (Restricted to authenticated admin)
  if (req.method === 'GET') {
    if (!isAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(200).json(messagesDb);
  }

  // POST: Create a new message or submit a reply
  if (req.method === 'POST') {
    const { email, message, replyToId, replyText } = req.body;

    // Handle Admin Reply (Requires authorization)
    if (replyToId && replyText) {
      if (!isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const msgIndex = messagesDb.findIndex(m => m.id === replyToId);
      if (msgIndex !== -1) {
        messagesDb[msgIndex].replies.push({
          text: replyText.replace(/</g, "&lt;").replace(/>/g, "&gt;"), // Sanitize HTML tag inputs
          timestamp: new Date().toISOString()
        });
        return res.status(200).json({ success: true, message: 'Reply added successfully', messages: messagesDb });
      }
      return res.status(404).json({ error: 'Message not found' });
    }

    // Handle New Guest Message (Publicly open, but sanitized)
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // Sanitize guest email and message to avoid HTML injection / XSS
    const cleanEmail = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const cleanMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const newMessage = {
      id: String(Date.now()),
      email: cleanEmail,
      message: cleanMessage,
      timestamp: new Date().toISOString(),
      replies: []
    };

    messagesDb.unshift(newMessage);
    return res.status(200).json({ success: true, message: 'Message saved successfully', data: newMessage });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}