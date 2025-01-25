import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export default merge(common, {
  mode: 'development',
  entry: path.resolve(projectRoot, 'src/index.dev.tsx'),
  output: {
    filename: 'bundle.dev.js',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    port: 3000,
    open: true,
    hot: true
  }
});
