"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../constants/redis");
const redis_2 = require("../helpers/redis");
const registerUser = async (req, res, next) => {
    try {
        const db = await (0, db_1.default)();
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                message: "All fields are required",
                response: {},
                success: false
            });
            return;
        }
        const user = await db.collection("users").findOne({ email });
        if (user) {
            res.status(400).json({
                message: "User already exists",
                response: {},
                success: false
            });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await db.collection("users").insertOne({ name, email, password: hashedPassword });
        await (0, redis_2.clearRedisCacheByKey)(redis_1.REDIS_KEYS.USERS_ALL);
        if (!newUser.insertedId) {
            res.status(400).json({
                message: "Failed to create user",
                response: {},
                success: false
            });
            return;
        }
        res.status(201).json({
            message: "User created successfully",
            response: {},
            success: true
        });
    }
    catch (error) {
        next(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const db = await (0, db_1.default)();
        const { email, password } = req.body;
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "User not found",
                response: {},
                success: false
            });
            return;
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({
                message: "Invalid password",
                response: {},
                success: false
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "10h" });
        res.status(200).json({
            message: "Login successful",
            response: { data: { token } },
            success: true
        });
    }
    catch (error) {
        console.log('error in loginUser', error);
        next(error);
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(401).json({
                message: "Unauthorized",
                response: {},
                success: false
            });
            return;
        }
        res.status(200).json({
            message: "Logout successful",
            response: {},
            success: true
        });
    }
    catch (error) {
        console.log('error in logoutUser', error);
        next(error);
    }
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=authController.js.map