"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    // Check if user exists
    const userExists = yield userModel_1.default.findOne({ email }).populate('saved');
    if (userExists) {
        res.status(400);
        throw new Error('This email is already in use');
    }
    // Hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    // Create user
    const user = yield userModel_1.default.create({
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
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check for user email
    const user = yield userModel_1.default.findOne({ email }).populate('saved');
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            saved: user.saved,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
}));
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(req['user']);
}));
// Generate JWT Token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
exports.default = { login, register, getMe };
//# sourceMappingURL=userController.js.map