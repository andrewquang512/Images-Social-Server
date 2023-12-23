import CopyWebpackPlugin from 'copy-webpack-plugin';
import { resolve } from 'path';

export default {
  entry: {
    handler: './src/handler.js',
  },
  mode: 'production',
  output: {
    filename: 'handler.js',
    library: {
      type: 'commonjs2',
    },
    publicPath: '',
    globalObject: 'this',
  },
  resolve: {
    mainFields: ['module', 'main'],
  },
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        test: /.*\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: [resolve('src/index.js')],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: ['./src/prisma/schema.prisma'] }),
  ],
  devServer: {
    proxy: {
      '/websocket': {
        target: 'ws://[address]:[port]',
        ws: true, // important
      },
    },
  },
};
