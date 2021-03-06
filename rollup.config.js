
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtIns from 'rollup-plugin-node-builtins';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/geoplatform.mapcore.js',
        format: 'umd',
        name: "GeoPlatformMapCore",
        sourcemap: 'inline',
        banner: '/* This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use. */',
        globals: {
            'Q': 'q'
        }
    },
    plugins: [
        builtIns(),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        babel({ exclude: 'node_modules/**' })
    ]
};
