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
    ],
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: ['./src/prisma/schema.prisma'] }), // without this the prisma generate above will not work
  ],
  exclude: {
    test: [/\.(js|jsx)$/],
    exclude: ['./src/index.js'],
  },
  devServer: {
    proxy: {
      '/websocket': {
        target: 'ws://[address]:[port]',
        ws: true, // important
      },
    },
  },
};
