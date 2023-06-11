import path from 'path';
import ip from 'ip';
import pkg from '../../package.json';

const NODE_ENV = process.env.NODE_ENV;

export const isProd = !!NODE_ENV && ['prod', 'production'].includes(NODE_ENV);

const JWT_SECRET =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NDM1MzQzMywiaWF0IjoxNjY0MzUzNDMzfQ.Nt9BF1OJ_yO4ZMfB0J8MXS7xYuPiTtkuFGV3pF7-HZA';

const WORK_PATH = process.cwd();

const NAME = pkg.name;

const PORT = isProd ? 10000 : 9900;

const HOST = isProd ? `xxx.com` : ip.address();

const JSON_TABLE_PATH = path.join(WORK_PATH, 'data');

// const REDIS = {
//     host: HOST,
//     port: 27020,
//     password: "123456",
// };

export const SERVER_CONFIG = {
    NODE_ENV,
    WORK_PATH,
    NAME,
    PORT,
    HOST,
    LOGGER_PATH: path.join(WORK_PATH, 'logs'),
    UPLOAD_MAX_FILE_SIZE: 1024 * 1024 * 1024 * 100, // 1G
    JWT_SECRET,
    JSON_TABLE_PATH,
};
