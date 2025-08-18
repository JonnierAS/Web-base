import { z } from "zod";

export const email = z.string().email({ message: 'El formato de correo electrónico no es válido' }).min(1, { message: 'El correo electrónico es requerido' }).transform((str) => str.toLowerCase().trim());

export const password = z.string().min(1, { message: 'La contraseña es requerida' });

export const LoginSchema = z.object({
  email,
  password,
});