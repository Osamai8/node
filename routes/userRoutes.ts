import { Router } from "express";
import { getUsers } from "../controllers/userController";

const route = Router();

route.get('/get-all', getUsers);

export default route;

