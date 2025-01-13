import 'dotenv/config';
import * as env from 'env-var';


export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  SERVICE: env.get('SERVICE').required().asString(),
  EMAIL: env.get('EMAIL').required().asEmailString(),
  KEY: env.get('KEY').required().asString(),
  MONGO_URL: env.get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: env.get('MONGO_URL').required().asString(),
  MONGO_USER: env.get('MONGO_URL').required().asString(),
  MONGO_PASS: env.get('MONGO_URL').required().asString(),
}




