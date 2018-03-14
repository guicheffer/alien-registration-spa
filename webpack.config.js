const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const minifyHtml = require('html-minifier').minify
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const WatchPlugin = require('./src/build-scripts/watch-plugin/index')

const { config: defaults } = require('./package.json')
const { title, description, path: common } = defaults

const stylintrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, common.stylintrc)))

module.exports = function(env = {}) {
  let cdnPath = env.cdnPath || common.static || common.liveUrl
  cdnPath = cdnPath.replace(/^\'|\'$/g, '')

  const loaders = {
    css: [
      'raw-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: env.dev,
          plugins: [
            require('autoprefixer')({ browsers: 'last 2 versions', remove: false }),
            require('cssnano')(),
          ],
        },
      },
      'stylus-loader',
      {
        loader: './src/build-scripts/stylus-variables-loader',
        options: { variables: { '$cdn-path': cdnPath } }
      },
      {
        loader: 'stylint-loader',
        options: stylintrc
      },
    ],
  }

  const plugins = {
    definePlugin: new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    uglify: new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
    moduleConcatenation: new webpack.optimize.ModuleConcatenationPlugin(),
    extractEntryCSS: new ExtractTextPlugin('../css/[name].css'),
    provide: new webpack.ProvidePlugin({ _: 'lodash' }),
    copy: new CopyPlugin([
      {
        context: path.resolve(__dirname, common.src, 'styleguide/fonts'),
        from: '**/*',
        to: path.resolve(__dirname, common.dist, common.static, './fonts'),
      },
      {
        context: path.resolve(__dirname, common.src),
        from: '**/*.+(svg|jpg|png|ico)',
        to: path.resolve(__dirname, common.dist, common.static),
      },
    ]),
    html: new HtmlWebpackPlugin({
      cache: false,
      filename: path.resolve(__dirname, common.dist, common.main),
      template: path.resolve(__dirname, common.src, common.main),
      inject: false,
      title,
      description,
      shortcut32x32: `/${common.static}${common.shortcut32x32}`,
    }),
    watch : new WatchPlugin({
      context: path.resolve(__dirname, common.src),
      files: ['**/*.jpg', '**/*.png', '**/*.svg'],
    }),
  }

  return {
    entry: {
      vendor: [
        'react',
        'lodash',
      ],
      setup: [
        `./${common.src}setup/entry`,
        `./${common.src}setup/entry.styl`
      ],
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, common.dist, './js'),
    },

    resolve: {
      alias: {
        _: 'lodash/lodash',
        underscore: 'lodash/lodash',
      },
      extensions: ['.js', '.styl', '.json', '.jsx'],
      modules: ['node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.styl$/,
          use: plugins.extractEntryCSS.extract({
            use: loaders.css,
          }),
        },
        {
          test: /(\.js|\.jsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, common.src),
          enforce: 'pre',
          loader: 'eslint-loader',
        },
        {
          test: /(\.js|\.jsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, common.src),
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          }],
        },
      ]
    },

    devtool: env.dev ? 'source-map' : '',

    plugins: env.dev ? [
      plugins.moduleConcatenation,
      plugins.extractEntryCSS,
      plugins.provide,
      plugins.copy,
      plugins.html,
      plugins.watch,
    ] : [
      plugins.definePlugin,
      plugins.uglify,
      plugins.moduleConcatenation,
      plugins.extractEntryCSS,
      plugins.provide,
      plugins.copy,
      plugins.html,
    ],
  }
}
