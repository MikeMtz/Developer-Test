module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/my-app'),
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }]
        },
        reporters: ['progress', 'kjhtml'],
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true
    });
};
