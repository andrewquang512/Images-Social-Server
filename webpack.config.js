import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  entry: './src/handler.js',
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
        test: /\*.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: [/\.(js|jsx)$/],
        exclude: ['src/index.js'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: ['./src/prisma/schema.prisma'] }), // without this the prisma generate above will not work
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
