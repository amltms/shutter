import e, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import mongoose from 'mongoose';

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req: Request, res: Response) => {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	// Check if user exists
	const userExists = await User.findOne({ email }).populate('saved');

	if (userExists) {
		res.status(400);
		throw new Error('This email is already in use');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		firstName,
		lastName,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await User.findOne({ email }).populate('saved');

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			saved: user.saved,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req: Request, res: Response) => {
	res.status(200).json(req['user']);
});

// Generate JWT Token
const generateToken = (id: mongoose.Types.ObjectId) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

export default { login, register, getMe };
