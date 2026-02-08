import { z } from "zod";
import { createUserSchema, updateUserPasswordSchema, updateUserSchema } from "../schemas/userSchema";
type CreateUserDTO = z.infer<typeof createUserSchema>;

type UpdateUserDTO = z.infer<typeof updateUserSchema>

type UpdateUserPasswordDTO = z.infer<typeof updateUserPasswordSchema>

export { CreateUserDTO, UpdateUserDTO, UpdateUserPasswordDTO };