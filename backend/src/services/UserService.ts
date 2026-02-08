import bcrypt from "bcryptjs";
import { UserRepository } from "../repository/UserRepository";
import { CreateUserDTO, UpdateUserDTO, UpdateUserPasswordDTO } from "../types/UserDTO";

const userRepo = new UserRepository();
export class UserService {
  async register(data: CreateUserDTO) {
    const user = await userRepo.findByEmail(data.email);
    if (user) {
      throw new Error("Usuario ja Cadastrado");
    }
    const { confirmPassword, ...userData } = data;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = {
      ...userData,
      password: hashedPassword,
    };
    const createdUser = await userRepo.createUser(newUser);
    return createdUser;
  }
  async getUser(id: number) {
    const user = await userRepo.findByIdPublic(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user
  }
    async updateUser(userId: number, data: UpdateUserDTO) {
      const updatedUser = await userRepo.updateUser(userId, data);
      return updatedUser
    }
    async updateUserPassword(userId: number, data: UpdateUserPasswordDTO) {
      const user = await userRepo.findById(userId)
      if(!user) {
        throw new Error("Usuario não encontrado")
      }
      const matchPassword = await bcrypt.compare(data.oldPassword, user.password)
      if(!matchPassword) {
        throw new Error("Senha incorreta")
      }
      const hashedPassword = await bcrypt.hash(data.password, 10)

      await userRepo.updatePassword(userId, hashedPassword);
    }
  async deleteUser(userId: number) {
    await userRepo.deleteUser(userId);
  }
}
