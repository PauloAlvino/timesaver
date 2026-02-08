import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { createUserSchema, updateUserPasswordSchema, updateUserSchema } from "../schemas/userSchema";
import { AuthenticatedRequest } from "../types/AuthDTO";
const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    const data = createUserSchema.parse(req.body);
    const user = await userService.register(data);
    res.status(201).json({ message: "Usuario Criado com sucesso", data: user });
  }
  async getUser(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const user = await userService.getUser(authReq.user.id);
    res.status(200).json(user);
  }
  async updateUser(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const data = updateUserSchema.parse(req.body);
    const updatedUser = await userService.updateUser(authReq.user.id, data);
    res.status(200).json(updatedUser);
  }
  async updateUserPassword(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const data = updateUserPasswordSchema.parse(req.body);
    await userService.updateUserPassword(authReq.user.id, data);
    res.status(200).json({message: "Senha trocada com sucesso"});
  }
  async deleteUser(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest
    await userService.deleteUser(authReq.user.id)
    res.status(204).send()
  }
}
