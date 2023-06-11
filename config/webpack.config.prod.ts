import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import baseWebpackConfig from './webpack.config.base';
import { resolve } from './util';
import pkg from '../package.json';

const PKG_NAME = pkg.name;

const prodWebpackConfig: Configuration = merge(baseWebpackConfig, {
    mode: 'production',
    stats: { children: false, warnings: false },
    output: {
        path: resolve('dist'),
        filename: `${PKG_NAME}`,
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    // warnings: false,
                    compress: {
                        // warnings: false,
                        drop_console: false,
                        dead_code: true,
                        drop_debugger: true,
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    mangle: true,
                },
                parallel: true,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true,
                },
            },
        },
    },
});

export default prodWebpackConfig;
