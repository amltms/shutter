"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemController_1 = __importDefault(require("../controllers/itemController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, itemController_1.default.getSaved).put(authMiddleware_1.protect, itemController_1.default.saveItem);
exports.default = router;
//# sourceMappingURL=itemRoutes.js.map