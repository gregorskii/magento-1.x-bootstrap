/*eslint "no-process-exit": 0*/

var notify = require('gulp-notify');

module.exports = function() {

    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error %>'
    }).apply(this, args);

    // Stop only when on build
    if (global.isBuild) {
        process.exit(1);
    } else {
        this.emit('end');
    }

};
