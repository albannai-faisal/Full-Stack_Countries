import dotenv from 'dotenv';

const node_env = process.env.NODE_ENV || 'development';
dotenv.config({ path: './' + node_env + '.env' });
