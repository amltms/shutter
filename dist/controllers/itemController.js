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
const userModel_1 = __importDefault(require("../models/userModel"));
const itemModel_1 = __importDefault(require("../models/itemModel"));
// @desc    get saved items
// @route   GET /api/items/
// @access  Private
const getSaved = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req['user']._id).populate('saved');
    res.status(200).json(user.saved);
}));
// @desc    add saved item
// @route   PUT /api/items/
// @access  Private
const saveItem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { media_type, id } = req.body;
    const itemExists = yield itemModel_1.default.findOne({ id, media_type });
    if (!itemExists) {
        // if the item doesnt exist in the database, add to database then to the user
        const saveItem = yield itemModel_1.default.create(req.body);
        const data = yield userModel_1.default.findByIdAndUpdate(req['user']._id, { $push: { saved: saveItem._id } }, { new: true }).populate('saved');
        res.status(200).json(data.saved);
    }
    else {
        const user = yield userModel_1.default.findById(req['user']._id);
        if (user.saved.includes(itemExists._id)) {
            // if the user has already saved the item
            const data = yield userModel_1.default.findByIdAndUpdate(user._id, { $pull: { saved: itemExists._id } }, { new: true }).populate('saved');
            res.status(200).json(data.saved);
        }
        else {
            // if the user hasnt saved the item
            const data = yield userModel_1.default.findByIdAndUpdate(user._id, { $push: { saved: itemExists._id } }, { new: true }).populate('saved');
            res.status(200).json(data.saved);
        }
    }
}));
exports.default = { getSaved, saveItem };
//# sourceMappingURL=itemController.js.map