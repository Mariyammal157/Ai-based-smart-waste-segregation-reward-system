import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users: Array<any> = [];

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existing = users.find((user) => user.email === email);
  if (existing) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: `${users.length + 1}`, name, email, hashedPassword, role: 'USER', pointsBalance: 0 };
  users.push(user);

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET ?? 'secret', {
    expiresIn: '7d'
  });

  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, pointsBalance: user.pointsBalance } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET ?? 'secret', {
    expiresIn: '7d'
  });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, pointsBalance: user.pointsBalance } });
}

export function me(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'secret') as any;
    const user = users.find((item) => item.id === payload.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, pointsBalance: user.pointsBalance } });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
}
