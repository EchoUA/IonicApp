exports.config = {
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            args: ['--disable-web-security']
        }
    },
    baseUrl: 'http://localhost:8100',
    specs: [
        'e2e-tests/**/*.tests.js'
    ],
    jasmineNodeOpts: {
        isVerbose: true,
    }
};










































// exports.config = {
//     seleniumAddress: 'http://localhost:4723/wd/hub',

//     specs: ['e2e-tests/**/*.tests.js'],

//     // Reference: https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js
//     // capabilities: {
//     //     platformName: 'android',
//     //     platformVersion: '7.0.0',
//     //     deviceName: 'Google Nexus 5X',
//     //     browserName: "",
//     //     autoWebview: true,
//     //     app: '/Users/roman.ishchiv/Documents/dogshows/platforms/android/build/outputs/apk/android-debug.apk'
//     //         //newCommandTimeout: 60
//     // },

//     // capabilities: {
//     //     device: 'iPhone Simulator',
//     //     name: "My Hybrid App",
//     //     platform: 'Mac',
//     //     app: "/Users/roman.ishchiv/Documents/dogshows/platforms/ios/build/emulator/myDogShow.app",
//     //     browserName: '',
//     //     newCommandTimeout: 60
//     // },

//     baseUrl: 'http://10.0.2.2:8000',

//     // configuring wd in onPrepare
//     // wdBridge helps to bridge wd driver with other selenium clients
//     // See https://github.com/sebv/wd-bridge/blob/master/README.md
//     onPrepare: function() {
//         var wd = require('wd'),
//             protractor = require('protractor'),
//             wdBridge = require('wd-bridge')(protractor, wd);
//         wdBridge.initFromProtractor(exports.config);
//     }
// };
