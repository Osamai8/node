"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovies = void 0;
const db_1 = __importDefault(require("../config/db"));
const getMovies = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query || {};
        const db = await (0, db_1.default)();
        const Movies = db.collection("movies");
        const conditions = {};
        const movies = await Movies.find(conditions).limit(Number(limit)).skip((Number(page) - 1) * Number(limit)).toArray();
        const totalMovies = await Movies.countDocuments(conditions);
        if (movies.length === 0) {
            res.status(404).json({
                message: "No data found",
                response: {},
                success: false
            });
            return;
        }
        res.status(200).json({
            message: "Data fetched successfully",
            response: {
                data: movies,
                total: totalMovies
            },
            success: true
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMovies = getMovies;
//# sourceMappingURL=movieController.js.map