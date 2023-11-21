export default {
  entry: './src/handler.js',
  mode: 'production',
  output: {
    filename: 'handler.js',
    library: {
      type: 'commonjs2',
    },
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
  devServer: {
    proxy: {
      '/websocket': {
        target: 'ws://[address]:[port]',
        ws: true, // important
      },
    },
  },
};
