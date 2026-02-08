import { z } from "zod";

const createUserSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome tem que possuir mais de 3 caracteres")
      .max(100, "O nome excedeu o limite de 100 caracteres"),
    email: z.email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter no minimo 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter no minimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

const updateUserSchema = z
  .object({
    email: z.email(),
    name: z
      .string()
      .min(3, "O nome tem que possuir mais de 3 caracteres")
      .max(100, "O nome excedeu o limite de 100 caracteres"),
  })
  .partial();

const updateUserPasswordSchema = z
  .object({
    oldPassword: z.string(),
    password: z.string().min(8, "A senha deve ter no minimo 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter no minimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  }).refine((data) => data.oldPassword !== data.password, {
    message: "A nova senha não pode ser igual a antiga",
    path: ["oldPassword"]
  });

export { createUserSchema, updateUserSchema, updateUserPasswordSchema };
