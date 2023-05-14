import * as webpack from 'webpack';
import {join} from 'path';

const config: webpack.Configuration = {
  mode: 'production',
  entry: join(__dirname, 'src/renderer/index.tsx'),
  output: {
    path: join(__dirname, 'build/src/renderer'),
    filename: 'webylauncher.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, join(__dirname, 'src/main')],
        include: [join(__dirname, 'src/renderer')],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

export default config;
