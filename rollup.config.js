
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtIns from 'rollup-plugin-node-builtins';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/geoplatform.mapcore.js',
        format: 'umd',
        name: "GeoPlatformMapCore"
    },
    sourceMap: 'inline',
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
    // ,
    // external: [
    //     'q',
    //     'jquery',
    //     'leaflet',
    //     'geoplatform.client'
    // ],
    // globals: {
    //     'q': 'Q',
    //     'jquery': 'jQuery',
    //     'leaflet': 'L',
    //     'geoplatform.client': "GeoPlatformClient"
    // }
};
