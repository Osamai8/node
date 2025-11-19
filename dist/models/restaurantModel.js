"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    building: { type: String, required: true },
    coord: { type: [Number], required: false },
    street: { type: String, required: true },
    zipcode: { type: String, required: true },
});
const gradeSchema = new mongoose_1.Schema({
    date: { type: mongoose_1.Schema.Types.Date, required: true },
    grade: { type: String, required: true },
    score: { type: Number, required: true }
});
const restaurantSchema = new mongoose_1.Schema({
    "_id": mongoose_1.Schema.Types.ObjectId,
    "address": addressSchema,
    "borough": { type: String, required: true },
    "cuisine": { type: String, required: true },
    "grades": [gradeSchema],
    "name": { type: String, required: true },
    "restaurant_id": { type: String, required: true }
}, { timestamps: true });
const Restaurants = (0, mongoose_1.model)("restaurants", restaurantSchema);
exports.default = Restaurants;
//# sourceMappingURL=restaurantModel.js.map