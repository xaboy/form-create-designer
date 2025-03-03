const gulp = require('gulp');
const execa = require('execa');
const fs = require('fs');

gulp.task('default', async function (cb) {
    await execa('node_modules/.bin/rimraf', ['locale']);
    fs.readdirSync('src/locale').forEach(async function (file) {
        const res = /^(.*)\.js$/.exec(file);
        if (res) {
            await execa('./node_modules/.bin/vite', ['build', '--config', './vite.config.locale.js', '-m', res[1]]);
        }
        cb();
    });
});
