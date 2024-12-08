import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const env = {
    development : process.env.NODE_ENV === 'development'
};

const uri = process.env.MONGO_URI;
const secret_key = process.env.SECRET_KEY;
const secret_key_2= process.env.SECRET_KEY_2;

export { port, env, uri, secret_key, secret_key_2};
