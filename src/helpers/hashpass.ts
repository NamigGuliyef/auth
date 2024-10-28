import { hash, compare, genSalt } from 'bcrypt';

// şifrə hash
export const hashPassword = async (password: string) => {
  return await hash(password, await genSalt(10));
};

// hash oxumaq
export const comparePassword = async ( password: string, hashPassword: string) => {
  return await compare(password, hashPassword);
};
