const path = require('path');
const basePath = path.resolve(__dirname);

module.exports = {
    context: path.join(basePath, 'src'),
    entry: {
        bug: './bug.js',
        unmute: './unmute.js',
        ws: './ws.js'
    },
    output: {
        path: path.join(basePath, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/dist'
    },
    devServer: {
        static: [
            {
                directory: basePath,
                staticOptions: {},
                serveIndex: true,
                watch: {
                    ignored: [
                        /.chrome/,
                        /node_modules/,
                        /bower_components/,
                        /coverage/,
                        /docs/,
                        /spec/
                    ]
                }
            }
        ]
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    }
};
