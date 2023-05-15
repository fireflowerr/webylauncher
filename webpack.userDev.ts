import * as webpack from 'webpack';
import {merge} from 'webpack-merge';
import DevConfiguration from './webpack.dev';

const config: webpack.Configuration = merge(DevConfiguration, {});

export default config;
