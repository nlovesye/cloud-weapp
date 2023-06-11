import { isProd, SERVER_CONFIG } from '@/config';
import log4js, { Configuration } from 'log4js';
import path from 'path';

const { LOGGER_PATH, NAME } = SERVER_CONFIG;

const config: Configuration = {
    appenders: {
        // 自定义category为error，记录服务器报错信息
        error: {
            type: 'file', //日志类型 指定单一文件存储
            filename: path.join(LOGGER_PATH, 'error/error.log'), // 日志输出位置，当目录文件或文件夹不存在时自动创建
            maxLogSize: 1024 * 1000 * 100, // 文件最大存储空间，单位是字节 1024k 1m
            backups: 100, // 当文件内容超过文件存储空间时，备份文件的数量
        },
        // 自定义category为response，记录服务器的响应情况 用户访问服务的情况
        response: {
            type: 'dateFile', // 以日期命名的文件记录日志
            filename: path.join(LOGGER_PATH, 'access/response'),
            pattern: 'yyyy-MM-dd.log', //日志输出模式
            alwaysIncludePattern: true,
            // dateFile类型的appender没有这个选项
            maxLogSize: 1024 * 1000 * 100,
            // dateFile类型的appender没有这个选项
            backups: 1,
        },
        console: {
            type: 'console',
            layout: {
                // 开发环境下带颜色输出，生产环境下使用基本输出
                type: isProd ? 'basic' : 'coloured',
            },
        },
        app: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: `[%d{yyyy/MM/dd hh:mm:ss} %p] %[${NAME}(%z)%] %m`,
                // tokens: {
                //     firstArg: ({ data }) => {
                //         return data[0];
                //     },
                // },
            },
        },
    },

    categories: {
        error: { appenders: ['error'], level: 'error' },
        response: { appenders: ['response'], level: 'info' },
        default: { appenders: ['console'], level: 'all' },
        app: { appenders: ['app'], level: 'all' },
    },

    pm2: isProd,
};

// 日志配置对象
log4js.configure(config);

export const errorLogger = log4js.getLogger('error');
export const responseLogger = log4js.getLogger('response');
export const logger = log4js.getLogger();
export const appLogger = log4js.getLogger('app');
