
const packageJSON = require('./package.json');
const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task("zip", async () => {
	return gulp.src(['dist', "i18n", "node_modules", "package.json", "static", "model"])
		.pipe(zip(`excel2ts-cc370.${packageJSON.version}.zip`))
		.pipe(gulp.dest('./release'))
})
