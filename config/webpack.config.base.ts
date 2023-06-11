import { Configuration, DefinePlugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import { resolve } from "./util";

const plugins: Configuration["plugins"] = [new CleanWebpackPlugin()];

if (!process.env.NODE_ENV) {
    plugins.push(
        new DefinePlugin({
            "process.env.NODE_ENV":
                process.env.NODE_ENV &&
                ["prod", "production"].includes(process.env.NODE_ENV)
                    ? "'production'"
                    : "'development'",
        })
    );
}

const baseWebpackConfig: Configuration = {
    entry: resolve("src/app.ts"),
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        fallback: {
            path: require.resolve("path-browserify"),
            fs: require.resolve("fs"),
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve("buffer/"),
        },
        alias: {
            "@": resolve("src"),
        },
    },
    plugins,
    externals: [nodeExternals()],
};

export default baseWebpackConfig;
