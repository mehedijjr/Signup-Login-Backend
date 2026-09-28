import express from "express";
import { signup } from "../controllers/signUp.controller.js";

export const router = express.Router();

router.post("/signup", signup);
