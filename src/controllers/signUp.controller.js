import bcrypt from "bcrypt";
import { createUser, findByEmail } from "../models/signUp.model.js";

export const signup = async (req, res) => {
  try {
    const name = String(req.body.name || "");
    const email = String(req.body.email || "");
    const password = String(req.body.password || "");

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await findByEmail(cleanEmail);
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await createUser({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};