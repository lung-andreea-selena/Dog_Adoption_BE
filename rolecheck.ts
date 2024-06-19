import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./models/User";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  console.log("Token recieved: ", token);
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }
  const secretKey = "my-32-character-ultra-secure-and-ultra-long-secret";
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Error verifying token: ", err);
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }

    req.body.userEmail = (decoded as { email: string }).email;
    console.log("User email: ", req.body.userEmail);
    next();
  });
};

export const verifyRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.userEmail;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!roles.includes(user.type)) {
      return res.status(403).json({ message: "Access denied!" });
    }

    next();
  };
};
