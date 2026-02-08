import { Request } from "express";
export type AuthenticatedRequest = Request & {
  user: {
    id: number;
    email: string;
  };
};

export type AuthRequest = Request & {
    user?: {
        id: number,
        email: string
    }
}