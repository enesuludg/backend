import { pbkdf2Sync, randomBytes } from 'crypto';

type HashedPassword = {
  hash: string;
  salt: string;
};
export interface IPasswordUtil {
  toHash: (password: string) => Promise<HashedPassword>;
  compare: (
    storedPassword: string,
    suppliedPassword: string,
  ) => Promise<boolean>;
}
export class PasswordUtil implements IPasswordUtil {
  async toHash(password: string) {
    const salt = randomBytes(128).toString('hex');
    const buf = pbkdf2Sync(password, salt, 1000, 64, `sha512`) as Buffer;

    return {
      hash: `${buf.toString('hex')}.${salt}`,
      salt,
    };
  }

  async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = pbkdf2Sync(
      suppliedPassword,
      salt,
      1000,
      64,
      'sha512',
    ) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }
}
