import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: pkg.main.split('/').slice(0, -1).join('/'),
      // file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: pkg.module.split('/').slice(0, -1).join('/'),
      // file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    del({
      targets: ['lib/**/*'],
      runOnce: true,
    }),
    peerDepsExternal(),
    nodeResolve({
      browser: false,
      preferBuiltins: false,
    }),
    json(),
    commonjs(),
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
