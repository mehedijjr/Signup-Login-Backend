import bcrypt from "bcrypt";
import { findByEmail } from "../models/signUp.model.js";

export const login = async (req, res) => {
  try {
    const email = String(req.body.email || "");
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const cleanEmail = email.trim().toLocaleLowerCase();
    const user = await findByEmail(cleanEmail);
    if (!user) {
      return res.status(401).json({
        message: "Email not found!",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid Password!",
      });
    }

    res.status(200).json({
      message: "Login successful",
      name: user.name,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};
