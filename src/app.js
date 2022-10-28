"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8001;
app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});
app.get('/', (request, result) => {
    result.send('Testing');
});
