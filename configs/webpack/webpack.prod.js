import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export default merge(common, {
  mode: 'production',
  entry: path.resolve(projectRoot, 'src/index.prod.tsx'),
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: 'index.js',
    library: '@inadiein/scoreboard-lib',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('RenameTypeDeclarationsPlugin', () => {
          const distPath = path.resolve(projectRoot, 'dist');
          const oldDtsPath = path.join(distPath, 'index.prod.d.ts');
          const newDtsPath = path.join(distPath, 'index.d.ts');

          if (fs.existsSync(oldDtsPath)) {
            fs.renameSync(oldDtsPath, newDtsPath);
          }
        });
      }
    }
  ]
});
