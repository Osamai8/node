import { Schema, Model } from "mongoose";
interface IUser {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Users: Model<IUser>;
export {};
//# sourceMappingURL=userModel.d.ts.map