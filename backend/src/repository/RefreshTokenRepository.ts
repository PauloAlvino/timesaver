import { RefreshToken } from "../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

export class RefreshTokenRepository {
  async createRefreshToken(
    token: string,
    userId: number,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    return prisma.refreshToken.upsert({
      where: { userId },
      create: {
        token: token,
        userId: userId,
        expiresAt: expiresAt,
      },
      update: { token, expiresAt },
    });
  }
  async findByToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({ where: { token } });
  }
  async deleteRefreshToken(token: string) {
    return prisma.refreshToken.deleteMany({ where: { token } });
  }
  async deleteByUserId(userId: number) {
    return prisma.refreshToken.deleteMany({ where: { userId } });
  }
}
