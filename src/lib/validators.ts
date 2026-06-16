import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(3, "O @ precisa ter pelo menos 3 caracteres.")
  .max(24, "O @ pode ter no maximo 24 caracteres.")
  .regex(/^[a-zA-Z0-9_]+$/, "Use apenas letras, numeros e underline.");

export const anonymousMessageSchema = z.object({
  receiverUserId: z.string().min(1),
  messageText: z
    .string()
    .trim()
    .min(1, "A mensagem nao pode ficar vazia.")
    .max(500, "A mensagem pode ter no maximo 500 caracteres.")
});

export const answerSchema = z.object({
  answerText: z
    .string()
    .trim()
    .min(1, "A resposta nao pode ficar vazia.")
    .max(500, "A resposta pode ter no maximo 500 caracteres.")
});

export const registerSchema = z
  .object({
    email: z.string().email("Informe um e-mail valido."),
    password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: z.string().email("Informe um e-mail valido."),
  password: z.string().min(1, "Informe sua senha.")
});
