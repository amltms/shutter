"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/register', userController_1.default.register);
router.post('/login', userController_1.default.login);
router.get('/me', authMiddleware_1.protect, userController_1.default.getMe);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map