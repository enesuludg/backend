// @UseGuards(AuthGuard) // * If we want to use Header Based Auth
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config';
@Injectable()
export class AuthGuard implements CanActivate {
  logger: Logger = new Logger(AuthGuard.name);
  constructor(@InjectModel('User') private userModel: Model<IUserDocument>) {}

  async canActivate(context: ExecutionContext) {
    try {
      let headerToken: any;
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
      ) {
        headerToken = req.headers.authorization.split('Bearer ')[1];
      }
      if (!headerToken) return false; // no token no entry
      let verifiedPayload: any;
      if (headerToken) {
        const payload = await jwt.verify(headerToken, secretKey);
        verifiedPayload = payload;
      }
      res.locals.account = verifiedPayload;
      res.id = verifiedPayload.sub;
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
