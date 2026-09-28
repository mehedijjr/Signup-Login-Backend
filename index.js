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
      "http://localhost:5000/",
    ],
    credentials: true,
  }),
);

// Home route
app.get("/", (req, res) => {
  res.send("Hello Mehedi");
});

// signup
app.use("/api", signUpRouter);

// login
app.use("/api", loginRouter);

// Database + Server
const startServer = async () => {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`Server running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Server start failed:", error);
  }
};

startServer();

export default app;
