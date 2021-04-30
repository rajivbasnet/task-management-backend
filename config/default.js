import dotenv from 'dotenv';

dotenv.config();

const config = {
    "jwtPrivateKey": process.env.JWT_KEY,
    "db": process.env.DB_CONN,
    "port": 3900,
    "requiresAuth": true
  }

export default config;