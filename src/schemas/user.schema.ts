import { Schema, model, Document } from 'mongoose';
import { UserI } from '../interfaces/user.interface';
import { IPasswordUtil, PasswordUtil } from '../utils/password.util';
import { UserStatus } from '../enums/userStatus.enum';
import { JsonWebTokenDto } from '../dtos/jwt.dto';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config';

export interface IUserDocument extends UserI, Document {
  id?: string;
  generateAuthToken: () => Promise<JsonWebTokenDto>;
  checkPassword: (password: string) => Promise<boolean>;
  checkRefreshToken: (refreshToken: string) => Promise<boolean>;
  updateRefreshToken: (refreshToken: string) => any;
  validatePassword: (password: string) => boolean;
}

export const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'email should not be empty'],
      index: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: UserStatus,
      default: UserStatus.Active,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

UserSchema.pre('save', async function (next: any) {
  const thisObj = this as UserI;
  if (!this.isModified('password')) {
    return next();
  }
  try {
    return next();
  } catch (e) {
    return next(e);
  }
});

UserSchema.methods.checkPassword = async function (password) {
  const passUtil: IPasswordUtil = new PasswordUtil();
  return await passUtil.compare(this.password, password);
};

UserSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign(
    {
      email: this.email,
      id: this._id,
      role: this.role,
      status: this.status,
    },
    secretKey,
  );
  return token;
};
UserSchema.methods.checkRefreshToken = async function (refresh_token) {
  const refreshToken = this.hashedRefreshToken;
  if (refreshToken === refresh_token) return true;
  else return false;
};

UserSchema.methods.updateRefreshToken = async function (refreshToken) {
  this.hashedRefreshToken = refreshToken;
  await this.save();
};

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;
