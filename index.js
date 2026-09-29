import express from "express";
import cors from "cors";
import connectDb from "./src/config/db.js";
import { router as signUpRouter } from "./src/routes/signUp.route.js";
import { loginRouter } from "./src/routes/login.route.js";

const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://sign-login-frontend.netlify.app",
      "http://localhost:5173",
      "http://localhost:5000",
    ],
    credentials: true,
  })
);

// Vercel Serverless- Database Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Hello Mehedi");
});

// Routes
app.use("/api", signUpRouter);
app.use("/api", loginRouter);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
  });
}

export default app;