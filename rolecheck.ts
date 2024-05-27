import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./models/User";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  const secretKey = process.env.JWT_SECRET_KEY as string;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }

    req.body.userEmail = (decoded as { email: string }).email;
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
