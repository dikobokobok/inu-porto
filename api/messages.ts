import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// ponytail: since vercel serverless functions have a read-only filesystem,
// we emulate a persistent datastore using a global in-memory array for preview/demo,
// and return structured JSON responses. In production, a database should be used.
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

  // GET: Fetch all messages
  if (req.method === 'GET') {
    return res.status(200).json(messagesDb);
  }

  // POST: Create a new message or submit a reply
  if (req.method === 'POST') {
    const { email, message, replyToId, replyText } = req.body;

    // Handle Admin Reply
    if (replyToId && replyText) {
      const msgIndex = messagesDb.findIndex(m => m.id === replyToId);
      if (msgIndex !== -1) {
        messagesDb[msgIndex].replies.push({
          text: replyText,
          timestamp: new Date().toISOString()
        });
        return res.status(200).json({ success: true, message: 'Reply added successfully', messages: messagesDb });
      }
      return res.status(404).json({ error: 'Message not found' });
    }

    // Handle New Guest Message
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    const newMessage = {
      id: String(Date.now()),
      email,
      message,
      timestamp: new Date().toISOString(),
      replies: []
    };

    messagesDb.unshift(newMessage);
    return res.status(200).json({ success: true, message: 'Message saved successfully', data: newMessage });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}