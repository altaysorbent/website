const tailwind = require('tailwindcss')('./tailwind.config.js');
const purgeCSS = require('@fullhuman/postcss-purgecss')({
  content: ['./src/template/**/*.html'],
  whitelist: ['html', 'body', 'h1', 'h2', 'h3', 'h4', 'h5'],
  whitelistPatternsChildren: [],
  extractors: [
    {
      extractor: class TailwindExtractor {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:/]+/g) || [];
        }
      },
      // Specify the file extensions to include when scanning for
      // class names.
      extensions: ['html', 'js'],
    },
  ],
});

const nested = require('postcss-nested');
const atImport = require('postcss-import');
const each = require('postcss-each');
const simpleVars = require('postcss-simple-vars');
const autoprefixer = require('autoprefixer')({});
const cssnano = require('cssnano')({
  preset: [
    'default',
    {
      discardComments: {
        removeAll: true,
      },
    },
  ],
});

const plugins = [tailwind, nested, atImport, each, simpleVars];

module.exports = ({ options }) => {
  if (options.mode === 'production') {
    plugins.push(purgeCSS);
  }

  plugins.push(autoprefixer, cssnano);

  return {
    plugins: plugins,
  };
};
