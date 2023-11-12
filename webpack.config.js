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
        test: /\*.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
