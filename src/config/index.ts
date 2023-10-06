import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd()) });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,

    expires_in: process.env.JWT_EXPIRES_IN,
  },
};
