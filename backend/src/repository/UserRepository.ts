import { prisma } from "../../lib/prisma";
import { User } from "../../generated/prisma/browser";
import { UpdateUserDTO, UpdateUserPasswordDTO } from "../types/UserDTO";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: { refresh: true },
    });
  }
  async findByIdPublic(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    avatarUrl?: string | null;
  }) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }
  async updateUser(id: number, data: UpdateUserDTO) {
    return prisma.user.update({
      where: {id},
      data,
      select: {id: true, name: true, email: true}
    })
  }
  async deleteUser(id: number) {
    return prisma.user.delete({where: {id}});
  }
  async updatePassword(id: number, password: string) {
    return prisma.user.update({
      where: {id},
      data: {password}
    })
  }
}
