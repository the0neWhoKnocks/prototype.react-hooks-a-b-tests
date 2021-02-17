const { resolve } = require('path');
const merge = require('lodash.merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// config options: https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file
module.exports = {
  typescript: {
    enableTypeChecking: false,
  },
  // WP: https://webpack.js.org/configuration/
  webpack: {
    configure: (webpackConfig, { env, paths }) => { 
      const { mode } = webpackConfig;
      const forProd = mode === 'production';
      
      // plugin opts: https://github.com/jantimon/html-webpack-plugin#options
      webpackConfig.plugins.forEach((plugin) => {
        if (plugin instanceof HtmlWebpackPlugin) {
          // plugin.options.minify = false;
          plugin.options.templateParameters = {
            TITLE: 'React Hooks A/B Tests',
            URL__SCRIPT__REACT: forProd
              ? 'https://unpkg.com/react@17/umd/react.production.min.js'
              : 'https://unpkg.com/react@17/umd/react.development.js',
            URL__SCRIPT__REACT_DOM: forProd
              ? 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'
              : 'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
          };
        }
      });
      
      return merge(webpackConfig, {
        externals: {
          react: 'React',
          'react-dom':'ReactDOM',
        },
      });
    }
  },
};
