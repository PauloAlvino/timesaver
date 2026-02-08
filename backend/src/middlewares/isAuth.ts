import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/AuthDTO";
import jwt from "jsonwebtoken";

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userHeader = req.headers.authorization;
  if (!userHeader) {
    return res.status(401).json({ message: "Não Autorizado" });
  }
  const token = userHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") {
      return res.status(400).json({ error: "Invalid token payload" });
    }
    const id = payload.id;
    const email = payload.email;
    req.user = { id, email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token Inválido ou expirado" });
  }
};
