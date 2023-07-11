import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePassword = (password1: string, password2: string) =>
  bcrypt.compareSync(password1, password2);
