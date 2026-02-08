import {z} from 'zod'

export const refreshSchema = z.object({
  token: z.string().min(1, "Token é obrigatório"),
});