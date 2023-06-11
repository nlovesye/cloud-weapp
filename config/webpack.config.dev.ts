import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import baseWebpackConfig from './webpack.config.base';
import { resolve } from './util';

const devWebpackConfig: Configuration = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    stats: { children: false },
    output: {
        path: resolve('dist'),
        filename: `server.debug.js`,
    },
});

export default devWebpackConfig;
