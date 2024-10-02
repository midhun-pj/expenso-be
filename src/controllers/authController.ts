import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Register a new user
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user: IUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Login user
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user: IUser | null = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};
