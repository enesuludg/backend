import { MaxLength, IsEmail, IsString, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { JsonWebTokenDto } from './jwt.dto';
export class UserDto {
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @MaxLength(30)
  readonly surname: string;

  @IsEmail()
  readonly email: string;

  @IsEmail()
  emailVerified: boolean;
}

@Exclude()
export class UserMeDto {
  @Exclude()
  id: string;
  name: string;
  surname: string;
  email: string;
  emailVerified: boolean;
  status: string;
  displayName: string;
  hashedRefreshToken: string;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  mailToken: number;
  /**
   *
   */
  constructor(partial: Partial<UserMeDto> = {}) {
    Object.assign(this, partial);
  }
}

export class UserSignResponseDTO {
  user: UserMeDto;
  tokens: JsonWebTokenDto;
  constructor(partial: Partial<UserSignResponseDTO> = {}) {
    Object.assign(this, partial);
  }
}

export class updateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly surname: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;
}
