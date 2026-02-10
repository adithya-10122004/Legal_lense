import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (for hackathon demo)
interface User {
  id: string;
  email: string;
  password: string;
}

interface Case {
  id: string;
  userId: string;
  scenario: string;
  summary: string;
  applicableLaws: any[];
  proceduralSteps: string[];
  sources: any[];
  timestamp: number;
}

const users: Map<string, User> = new Map();
const cases: Map<string, Case> = new Map();

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// ============ AUTHENTICATION ROUTES ============

// Register route
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  // Check if user exists
  if (users.has(email)) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Create user
  const userId = generateId();
  users.set(email, { id: userId, email, password });

  res.status(201).json({ 
    message: 'User registered successfully',
    user: { id: userId, email }
  });
});

// Login route
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Check user exists
  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.status(200).json({ 
    message: 'Login successful',
    user: { id: user.id, email: user.email }
  });
});

// ============ CASES ROUTES ============

// Get all cases for a user
app.get('/api/cases/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  const userCases = Array.from(cases.values())
    .filter(c => c.userId === userId)
    .sort((a, b) => b.timestamp - a.timestamp);

  res.json({ cases: userCases });
});

// Create a new case
app.post('/api/cases', (req: Request, res: Response) => {
  const { userId, scenario, summary, applicableLaws, proceduralSteps, sources } = req.body;

  // Validate input
  if (!userId || !scenario) {
    return res.status(400).json({ error: 'userId and scenario required' });
  }

  const caseId = generateId();
  const newCase: Case = {
    id: caseId,
    userId,
    scenario,
    summary,
    applicableLaws,
    proceduralSteps,
    sources,
    timestamp: Date.now()
  };

  cases.set(caseId, newCase);

  res.status(201).json({ 
    message: 'Case created successfully',
    case: newCase
  });
});

// Delete a case
app.delete('/api/cases/:caseId', (req: Request, res: Response) => {
  const { caseId } = req.params as { caseId: string };

  if (!cases.has(caseId)) {
    return res.status(404).json({ error: 'Case not found' });
  }

  cases.delete(caseId);
  res.json({ message: 'Case deleted successfully' });
});

// Delete all cases for a user
app.delete('/api/cases/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  let deletedCount = 0;
  for (const [key, value] of cases.entries()) {
    if (value.userId === userId) {
      cases.delete(key);
      deletedCount++;
    }
  }

  res.json({ message: `${deletedCount} cases deleted successfully` });
});

// ============ HEALTH CHECK ============

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'Backend is running',
    timestamp: new Date().toISOString(),
    userCount: users.size,
    caseCount: cases.size
  });
});

// ============ ERROR HANDLING ============

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Legal_Lense Backend Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

export default app;
