import { Response, Request } from "express";
import { loginSchema } from "../schemas/loginSchema";
import { refreshSchema } from "../schemas/refreshSchema";
import { AuthService } from "../services/AuthService";
import { AuthenticatedRequest } from "../types/AuthDTO";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = loginSchema.parse(req.body);
    const data = await authService.login(email, password);
    return res.status(200).json({
      message: "Login efetuado com sucesso",
      accessToken: data.accesstoken,
      refreshToken: data.refreshToken,
    });
  }
  async refresh(req: Request, res: Response) {
    const { token } = refreshSchema.parse(req.body);
    const accessToken = await authService.refresh(token);
    res.status(200).json(accessToken);
  }
  async logout(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    await authService.logout(authReq.user.id);
    res.status(200).json({ message: "Logout efetuado com sucesso" });
  }
}
