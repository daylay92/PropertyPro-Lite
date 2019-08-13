const path = require('path');

module.exports = {
    entry : './UI/assets/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'UI/assets/dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    mode: 'development'

}