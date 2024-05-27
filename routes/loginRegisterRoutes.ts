import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

dotenv.config();
const router = express.Router();

router.put("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (user) {
    const jwtToken = jwt.sign(
      { email: email, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.JWT_SECRET_KEY as string
    );
    res.json({ message: "Welcome back!", token: jwtToken, user: user });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
});

router.post("/register", async (req, res) => {
  const { name, age, email, password, type } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (user) {
    res.status(400).json({ message: "User already exists!" });
  } else {
    const newUser = await UserModel.create({
      name,
      age,
      email,
      password,
      type,
    });
    res
      .status(200)
      .json({ message: "User created successfully!", user: newUser });
  }
});

export default router;
