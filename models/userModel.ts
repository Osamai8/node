import { Schema, model, Model } from "mongoose";

interface IUser {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const usersSchema = new Schema<IUser>({
    "_id": Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export const Users: Model<IUser> = model<IUser>("users", usersSchema);
// const userType = Users.schema.obj;
// export type UserModelType = typeof userType;
