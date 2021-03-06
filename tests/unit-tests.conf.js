// Karma configuration
// Generated on Mon Nov 14 2016 11:00:10 GMT+0200 (EET)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../lib/jquery/dist/jquery.js',
            '../lib/ionic/js/ionic.bundle.js',
            '../lib/angular-mocks/angular-mocks.js',
            '../lib/firebase/firebase.js',
            '../lib/angularfire/dist/angularfire.js',
            '../lib/underscore/underscore.js',
            '../lib/angular-underscore-module/angular-underscore-module.js',
            '../lib/ionic-image-lazy-load/ionic-image-lazy-load.js',
            '../lib/ngCordova/dist/ng-cordova.js',
            '../lib/ngCordova/dist/ng-cordova-mocks.js',
            '../js/*.js',
            '../js/**/*.js',
            '../modules/**/*.js',
            'unit-tests/*.js',
        ],

        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
