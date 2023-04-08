const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer(),
    cssnano()
  ]
};