"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
// setup application
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}));
//routes
app.use('/', routers_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
