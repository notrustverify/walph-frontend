const webpack = require('webpack')

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {}
    Object.assign(fallback, {
        fs: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        process: require.resolve('process/browser')
    })
    config.resolve.fallback = fallback
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    config.module.rules.unshift({
        test: /\.m?js$/,
        resolve: {
            fullySpecified: false, // disable the behavior
        },
    });
    return config
}
