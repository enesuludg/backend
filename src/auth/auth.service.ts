import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PasswordUtil } from '../utils/password.util';
import { SignInDto, SignUpDto, userSignInDTO } from '../dtos/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IUserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { errorMessages } from '../utils/error.messages';
import { JsonWebTokenDto } from 'src/dtos/jwt.dto';
import { UserMeDto } from 'src/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IUserDocument>) {}
  public readonly passwordutil = new PasswordUtil();
  async signIn(credentials: SignInDto): Promise<any> {
    const existingUser = await this.userModel.findOne({
      email: credentials.email,
    });
    if (!existingUser)
      throw new ForbiddenException({ ...errorMessages.WRONG_CREDENTIALS });
    if (!(await existingUser.checkPassword(credentials.password)))
      throw new ForbiddenException({ ...errorMessages.WRONG_CREDENTIALS });
    if (!existingUser.emailVerified)
      throw new NotFoundException(errorMessages.EMAIL_NOT_VERIFY);
    const tokens: JsonWebTokenDto = await existingUser.generateAuthToken();
    existingUser.updateRefreshToken(tokens.refresh_token);
    const user: userSignInDTO = {
      id: existingUser.id,
      name: existingUser.name,
      surname: existingUser.surname,
      email: existingUser.email,
      status: existingUser.status,
    };
    return { user, tokens };
  }
  async signUp(credentials: SignUpDto): Promise<any> {
    if (!credentials.password)
      throw new NotFoundException(errorMessages.PASSWORD_REQ);
    const User = await this.userModel.findOne({
      email: credentials.email,
    });
    if (User) throw new BadRequestException(errorMessages.ACCOUNT.EMAIL_EXISTS);
    const createUser = await this.userModel.create(credentials);
    return { createUser };
  }

  async me(userId: string): Promise<UserMeDto> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser)
      throw new ForbiddenException(errorMessages.AUTH_REQUIRED);
    return new UserMeDto({
      id: existingUser.id,
      status: existingUser.status,
      email: existingUser.email,
      emailVerified: existingUser.emailVerified,
      name: existingUser.name,
      surname: existingUser.surname,
    });
  }
}
