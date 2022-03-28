import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsString()
  DOMAIN: string;
  @IsNumber()
  HTTP_PORT: number;
  @IsString()
  TCP_URL: string;
  @IsString()
  MONGO_INITDB_ROOT_USERNAME: string;
  @IsOptional()
  @IsString()
  MONGO_INITDB_ROOT_PASSWORD: string;
  @IsOptional()
  @IsString()
  MONGO_INITDB_PASSWORD: string;
  @IsOptional()
  @IsString()
  MONGO_INITDB_USERNAME: string;
  @IsOptional()
  @IsString()
  MONGO_INITDB_DATABASE: string;
  @IsOptional()
  @IsString()
  MONGO_INITDB_NAME: string;
  @IsOptional()
  @IsNumber()
  MONGO_DB_PORT?: number;
  @IsString()
  @IsOptional()
  MONGO_URI: string;
  @IsString()
  @IsOptional()
  secretKey: string;
}

export function validateEnvironment(config: any) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
