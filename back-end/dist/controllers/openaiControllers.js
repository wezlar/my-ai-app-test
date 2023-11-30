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
exports.generateResponse = exports.generateCurrentConverstation = void 0;
const openaiConfig_1 = __importDefault(require("../config/openaiConfig"));
const defaultConfig = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello, World!" }
];
const generateCurrentConverstation = ({ previousMessages, newMessage }) => {
    const messages = previousMessages || defaultConfig;
    if (newMessage) {
        messages.push({ role: "user", content: newMessage });
    }
    return messages;
};
exports.generateCurrentConverstation = generateCurrentConverstation;
const generateResponse = (messages) => __awaiter(void 0, void 0, void 0, function* () {
    const completion = yield openaiConfig_1.default.chat.completions.create({
        messages,
        model: 'gpt-4-1106-preview',
    });
    return completion;
});
exports.generateResponse = generateResponse;
