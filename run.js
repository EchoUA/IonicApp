(function() {
    'use strict';

    angular
        .module('ds')
        .run(runFunction);

    runFunction.$inject = ['$rootScope', '$ionicHistory', '$ionicPlatform', '$ionicSideMenuDelegate', 'ROUTES', '$window', '$state', 'loader', 'noInternet', '$firebaseObject', 'firebaseAPI', 'appVersion', '$http', 'API', '$cordovaNetwork', '$log'];

    function runFunction($rootScope, $ionicHistory, $ionicPlatform, $ionicSideMenuDelegate, ROUTES, $window, $state, loader, noInternet, $firebaseObject, firebaseAPI, appVersion, $http, API, $cordovaNetwork, $log) {

        $rootScope.appVersion = appVersion;

        $rootScope.global = {
            showSearch: false,
            showCalmHeader: true
        };
        $rootScope.appLangs = [{
            val: 'en',
            name: 'English'
        }, {
            val: 'nl',
            name: 'Dutch'
        }];
        $rootScope.lang = {
            en: window.en,
            nl: window.nl
        };
        $rootScope.appLang = { type: localStorage.getItem("appLang") || $rootScope.appLangs[1].val };
        $rootScope.appLangChange = function() {
            localStorage.setItem("appLang", $rootScope.appLang.type)
        };

        $rootScope.searchedText = "";
        $rootScope.ROUTES = ROUTES;
        $rootScope.searchBarVisibility = false;
        $rootScope.searchText = {
            title: ""
        };
        $rootScope.usrLogged = localStorage.getItem("usrLogged") || false;
        $rootScope.usr = JSON.parse(localStorage.getItem("usr")) || {
            email: undefined,
            uid: undefined,
            admin_status: undefined
        };

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            loader.show();
            var itBreeds = toState.name == "app.breeds",
                itSne = toState.name == "app.shows-n-entries",
                itSneB = toState.name == "app.showbreeds",
                itEnt = toState.name == "app.entries",
                itEvt1 = toState.name == "app.showbreeds1",
                itEvt2 = toState.name == "app.showbreeds2",
                itEvt3 = toState.name == "app.showbreeds3",
                itEvt4 = toState.name == "app.showbreeds4",
                itTrophy = toState.name == "app.showtrophys",
                itTroFCI = toState.name == "app.showtrophysfci",
                itLog = toState.name == "app.login",
                itReg = toState.name == "app.registration",
                header = $('ion-header-bar, ion-nav-bar');


            var isNews = toState.name == "app.news",
                isNews2 = toState.name == "app.new",
                isRings = toState.name == "app.showbreeds",
                isJudges = toState.name == "app.showbreeds2",
                isBreeds = toState.name == "app.showbreeds3";
            $rootScope.isNewsScope = isNews;
            $rootScope.isNews2Scope = isNews2;

            if (itBreeds || itSne || itSneB || itEvt1 || itEvt2 || itEvt3 || itEvt4 || itTrophy || itTroFCI) { // || itEnt
                $rootScope.global.showSearch = true;
            } else {
                $rootScope.global.showSearch = false;
            }
            if (itLog || itReg) {
                header.removeClass('bar-calm').addClass('bar-light');
            } else {
                header.removeClass('bar-light').addClass('bar-calm');
            }
            $rootScope.searchText.title = "";
        });
        $rootScope.logout = function() {
            $rootScope.usrLogged = false;
            $rootScope.usr = {
                email: undefined,
                uid: undefined,
                admin_status: undefined
            };
            localStorage.setItem("usrLogged", false)
            localStorage.setItem("usr", JSON.stringify($rootScope.usr));
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go("app.login");
            $ionicSideMenuDelegate.toggleLeft();
        };

        $rootScope.logActive = false;
        $rootScope.data = {
            items: [],
            noMoreNews: false
        };
        $rootScope.updateShowsCounter = function() {

            var ref = new Firebase(firebaseAPI + "/counter/" + $rootScope.usr.uid);
            $rootScope.newShowsCount = $firebaseObject(ref);

        };
        $rootScope.updateShowsCounter();

        if ($rootScope.usr.email == undefined) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            window.location.hash = "#/app/login";
        }

        console.log("App starting");
        $ionicPlatform.ready(function() {

            $rootScope.isOffline;
            document.addEventListener("deviceready", function() {
                var type = $cordovaNetwork.getNetwork()
                var isOnline = $cordovaNetwork.isOnline()
                $rootScope.isOffline = $cordovaNetwork.isOffline()

                // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                    var onlineState = networkState;
                    $rootScope.isOffline = false;
                })

                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                    var offlineState = networkState;
                    $rootScope.isOffline = true;
                })

                if ($rootScope.isNewsScope || $rootScope.isNews2Scope || $rootScope.usrLogged) {
                    if (AdMob) {
                        var adPublisherIds = {
                            ios: {
                                banner: "ca-app-pub-8341477571998920/6936040699",
                                interstitial: "ca-app-pub-8341477571998920/8412773896"
                            },
                            android: {
                                banner: "ca-app-pub-8341477571998920/5238981493",
                                interstitial: "ca-app-pub-8341477571998920/5459307492"
                            }
                        };
                        var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

                        if (window.AdMob) {
                            AdMob.createBanner({
                                adId: admobid.banner,
                                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                                autoShow: true
                            })
                        }
                    }
                }

            }, false);

            // AppRating
            (function() {
                AppRate.preferences.storeAppURL.ios = 'com.twegtech.mydogshow';
                AppRate.preferences.storeAppURL.android = 'market://details?id=com.ionicframework.dogshows780367';

                var rating = {
                    interval: undefined,
                    initialTime: 1200000,
                    intervalTime: localStorage.getItem("ratingIntervalTime") ? localStorage.getItem("ratingIntervalTime") : 1200000,
                    disabled: localStorage.getItem("ratingDisabled") ? parseInt(localStorage.getItem("ratingDisabled")) : 0,
                    step: 1000,
                    intervalFunc: function() {
                        if (rating.intervalTime > 0) {
                            rating.intervalTime -= rating.step;
                            localStorage.setItem("ratingIntervalTime", rating.intervalTime);
                        } else {
                            localStorage.setItem("ratingDisabled", 1)
                            rating.disabled = true;
                            clearInterval(rating.interval)
                            AppRate.promptForRating();
                        }
                    },
                    init: function() {
                        rating.intervalTime = localStorage.getItem("ratingIntervalTime") ? localStorage.getItem("ratingIntervalTime") : rating.initialTime,
                            rating.interval = setInterval(rating.intervalFunc, rating.step)
                    },
                    reinit: function() {
                        localStorage.setItem("ratingIntervalTime", rating.initialTime)
                        localStorage.setItem("ratingDisabled", 0)
                        rating.intervalTime = rating.initialTime;
                        rating.init()
                    }
                };
                AppRate.preferences.callbacks.onButtonClicked = function(buttonIndex) {
                    if (buttonIndex == 2) {
                        rating.reinit()
                    }
                };
                if (!rating.disabled) {
                    rating.init()
                }
            })();

            var notificationOpenedCallback = function(jsonData) {
                console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
            };

            window.plugins.OneSignal.init("21f7b381-493a-44e2-915d-af7a4dc731a8", { googleProjectNumber: "470037789745" },
                notificationOpenedCallback);

            // Show an alert box if a notification comes in when the user is in your app.
            window.plugins.OneSignal.enableInAppAlertNotification(true);

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                window.open = cordova.InAppBrowser.open;
                window.analytics.startTrackerWithId('UA-3366198-18');
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
                StatusBar.overlaysWebView(false);
            }
            if (window.plugins && window.plugins.webviewcolor) {
                window.plugins.webviewcolor.change('#ffffff')
            };
            document.addEventListener('touchstart', function(event) {
                if ($ionicSideMenuDelegate.isOpenLeft()) {
                    event.preventDefault();
                }
            });
        });
    }

})();
