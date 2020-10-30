"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const revoke_tokens_1 = require("./revoke_tokens");
exports.Router = express_1.default.Router();
exports.Router.use('/refresh_token', revoke_tokens_1.Router);
