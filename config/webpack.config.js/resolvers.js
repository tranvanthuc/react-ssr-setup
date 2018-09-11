const path = require('path');
const paths = require('../paths');

module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
    modules: paths.resolveModules,
    alias: {
        Assets: path.resolve(__dirname, '../../src/shared/assets'),
        Components: path.resolve(__dirname, '../../src/shared/components'),
        Store: path.resolve(__dirname, '../../src/shared/store'),
        Utils: path.resolve(__dirname, '../../src/shared/utils'),
    },
};
