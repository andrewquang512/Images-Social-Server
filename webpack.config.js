export default {
  target: 'node',
  entry: './src/handler.js',
  mode: 'production',
  output: {
    filename: 'handler.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
            },
          ],
        },
      },
    ],
  },
};
