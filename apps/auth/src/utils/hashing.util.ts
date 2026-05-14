import { compare, hash } from 'bcryptjs';

export const hashPassword = async (plainTextPassword: string) => {
  return hash(plainTextPassword, 10);
};
export const verifyPassword = async (
  plainTextPassword: string,
  hashedPassword: string,
) => {
  return compare(plainTextPassword, hashedPassword);
};
