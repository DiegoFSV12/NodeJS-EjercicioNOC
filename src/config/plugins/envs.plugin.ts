import 'dotenv/config';
import * as env from 'env-var';


export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  SERVICE: env.get('SERVICE').required().asString(),
  EMAIL: env.get('EMAIL').required().asEmailString(),
  KEY: env.get('KEY').required().asString()
}




