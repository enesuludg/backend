import { config } from 'dotenv';
import { validateEnvironment } from './env.validation';

const conf = config({ path: '.env' });
export const {
  HTTP_PORT,
  NODE_ENV,
  DOMAIN,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_INITDB_PASSWORD,
  MONGO_INITDB_USERNAME,
  MONGO_INITDB_DATABASE,
  MONGO_INITDB_NAME,
  MONGO_URI,
  secretKey,
} = validateEnvironment(conf.parsed);

export const corsConfig = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
    'Host',
    'api_key',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};
export const mongoDB = MONGO_INITDB_DATABASE || 'outputDB';

export const mongoPort = process.env.MONGO_DB_PORT || 27017;

export const MONGO_URL =
  MONGO_URI ||
  `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongodb:${mongoPort}/${mongoDB}`;

export const MONGO_CONF = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
