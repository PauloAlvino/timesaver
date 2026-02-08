import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repository/UserRepository";
import { RefreshTokenRepository } from "../repository/RefreshTokenRepository";
const userRepo = new UserRepository();
const refreshRepo = new RefreshTokenRepository();
interface RefreshPayload {
  id: number;
  email: string;
}
export class AuthService {
  async login(email: string, password: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("E-mail ou senha inválidas");
    }
    const accesstoken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" },
    );
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await refreshRepo.createRefreshToken(refreshToken, user.id, expiresAt);
    return { accesstoken, refreshToken };
  }
  async refresh(refreshToken: string) {
    const token = await refreshRepo.findByToken(refreshToken);
    if (!token) {
      throw new Error("Token Inválido");
    }
    if (token.expiresAt < new Date()) {
      await refreshRepo.deleteRefreshToken(token.token);
      throw new Error("Token expirado");
    }
    try {
      const decode = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!,
      ) as RefreshPayload;
      const user = await userRepo.findById(decode.id);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      if (token.userId !== user.id) {
        throw new Error("Token não pertence ao usuário");
      }
      const accesstoken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" },
      );
      return { accesstoken };
    } catch {
      throw new Error("Refresh token inválido ou expirado");
    }
  }
  async logout(userId: number) {
    await refreshRepo.deleteByUserId(userId);
    
  }
}
