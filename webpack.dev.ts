import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import * as webpack from 'webpack';
import {merge} from 'webpack-merge';
import DefaultConfig from './webpack.config';

const config: webpack.Configuration = merge(DefaultConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: false,
  },

  devServer: {
    host: 'localhost',
    static: './build',
    devMiddleware: {
      writeToDisk: true,
    },
  } as DevServerConfiguration,
});

export default config;
