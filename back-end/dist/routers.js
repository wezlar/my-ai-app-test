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
const express_1 = __importDefault(require("express"));
const openaiControllers_1 = require("./controllers/openaiControllers");
const router = express_1.default.Router();
// routes
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const messages = (0, openaiControllers_1.generateCurrentConverstation)({
        previousMessages: (_a = req.body) === null || _a === void 0 ? void 0 : _a.previousMessages,
        newMessage: (_b = req.body) === null || _b === void 0 ? void 0 : _b.newMessage
    });
    try {
        const chat = yield (0, openaiControllers_1.generateResponse)(messages);
        console.log(chat.choices[0].message);
        res.send([
            ...messages,
            Object.assign({}, chat.choices[0].message)
        ]);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
exports.default = router;
