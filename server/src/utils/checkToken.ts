import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado." });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret as string);

    next();
  } catch (error) {
    return res.status(400).json({ message: "Token inválido." });
  }
}
