const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const mode = env.development ? 'development' : 'production';
  const devtool = mode === 'development' ? 'inline-source-map' : 'source-map';

  return {
    mode,
    entry: {
      index: './src/index.ts'
    },
    devtool,
    devServer: { contentBase: './build' },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ filename: 'index.html', chunks: ['index'], template: 'src/index.html' }),
      new CopyPlugin({
        patterns: [
          { from: 'src/data/data.json', to: "data.json" }
        ],
      }),
      // new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [/* MiniCssExtractPlugin.loader, */ 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: 'stories.js',
      path: path.resolve(__dirname, 'build')
    }
  }
};
