import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// Resolved database path targeting /src/db/chat.json
const dbPath = path.resolve(process.cwd(), 'src/db/chat.json');

// Memory DB fallback to handle Vercel's read-only filesystem dynamically
let memoryDb: any[] = [];
let dbInitialized = false;

function initDb() {
  if (dbInitialized) return;
  try {
    if (fs.existsSync(dbPath)) {
      const raw = fs.readFileSync(dbPath, 'utf8');
      memoryDb = JSON.parse(raw);
    } else {
      memoryDb = [
        {
          id: "1",
          email: "system@example.com",
          message: "Welcome to Ibnu's secure chat network!",
          timestamp: new Date().toISOString(),
          replies: []
        }
      ];
    }
  } catch (err) {
    console.error('Error initializing messages database:', err);
    memoryDb = [
      {
        id: "1",
        email: "system@example.com",
        message: "Welcome to Ibnu's secure chat network! (Memory Fallback)",
        timestamp: new Date().toISOString(),
        replies: []
      }
    ];
  }
  dbInitialized = true;
}

// Helper to safely read chat messages
function readDb(): any[] {
  initDb();
  return memoryDb;
}

// Helper to safely write messages
function writeDb(data: any[]): void {
  memoryDb = data;
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    // Non-blocking log: works in memory if Vercel serverless filesystem is read-only
    console.warn('Filesystem write bypassed. Running in-memory database:', err);
  }
}

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

  // GET: Fetch all messages
  if (req.method === 'GET') {
    const messages = readDb();
    return res.status(200).json(messages);
  }

  // POST: Create a new message or submit a reply
  if (req.method === 'POST') {
    const { email, message, replyToId, replyText } = req.body;
    let messages = readDb();

    // Handle Admin Reply (Requires authorization)
    if (replyToId && replyText) {
      if (!isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const msgIndex = messages.findIndex(m => m.id === replyToId);
      if (msgIndex !== -1) {
        messages[msgIndex].replies.push({
          text: replyText.replace(/</g, "&lt;").replace(/>/g, "&gt;"), // Sanitize HTML tag inputs
          timestamp: new Date().toISOString()
        });
        writeDb(messages);
        return res.status(200).json({ success: true, message: 'Reply added successfully', messages: messages });
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

    messages.unshift(newMessage);
    writeDb(messages);
    return res.status(200).json({ success: true, message: 'Message saved successfully', data: newMessage });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}