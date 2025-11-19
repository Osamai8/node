"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    "_id": mongoose_1.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
exports.Users = (0, mongoose_1.model)("users", usersSchema);
// const userType = Users.schema.obj;
// export type UserModelType = typeof userType;
//# sourceMappingURL=userModel.js.map