export default {
  target: 'node',
  entry: './src/handler.js',
  mode: 'production',
  output: {
    filename: 'handler.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    mainFields: ['module', 'main'],
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
