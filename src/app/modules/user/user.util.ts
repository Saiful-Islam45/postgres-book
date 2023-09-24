import bcrypt from 'bcrypt';
import config from '../../../config';

export const isPasswordMatched= async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const hashedPassword = async(password: string) => {
 return  await  bcrypt.hash(password, Number(config.bycrypt_salt_round));
} 