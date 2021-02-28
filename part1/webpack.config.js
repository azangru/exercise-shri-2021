const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const mode = env.development ? 'development' : 'production';
  const devtool = mode === 'development' ? 'inline-source-map' : 'source-map';

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ filename: 'index.html', chunks: ['index'], template: 'src/index.html' }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/data/data.json', to: "data.json" }
      ],
    })
  ];

  if (mode === 'production') {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'stories.css'
    }));
  }

  return {
    mode,
    entry: {
      index: './src/index.ts'
    },
    devtool,
    devServer: { contentBase: './build' },
    plugins,
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ],
        },
        {
          test: /\.(ttf)$/i,
          type: 'asset/resource',
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
