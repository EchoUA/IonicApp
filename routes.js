(function() {
    'use strict';

    angular
        .module('starter')
        .config(routeFunction);

    routeFunction.$injector = ['$stateProvider', '$urlRouterProvider', 'ROUTES', '$ionicConfigProvider'];

    function routeFunction($stateProvider, $urlRouterProvider, ROUTES, $ionicConfigProvider) {

        $ionicConfigProvider
            .backButton
            .previousTitleText(false)
            .text('');
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $ionicConfigProvider.scrolling.jsScrolling(false);

        var tpl = "templates/";

        $stateProvider
            .state('app', {
                url: ROUTES.MAIN,
                abstract: true,
                templateUrl: tpl + 'menu.html',
                controller: 'AppCtrl'
            })
            .state('app.news', {
                url: ROUTES.NEWS,
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: 'modules/news/news.view.html',
                        controller: 'NewsCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.new', {
                cache: false,
                url: ROUTES.NEWS + "/:newsId",
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: 'modules/news-item/news-item.view.html',
                        controller: 'NewsItemCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.judge', {
                url: ROUTES.JUDGE + "/item?judgeId&eventId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'judge.html',
                        controller: 'JudgeCtrl'
                    }
                }
            })
            .state('app.shows-n-entries', {
                url: ROUTES.SNE,
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'shows-n-entries.html',
                        controller: 'ShowsNEntriesCtrl'
                    }
                }
            })
            .state('app.showbreeds', {
                url: ROUTES.SHOWBREEDS + "/:evtId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'showbreeds.html',
                        controller: 'ShowbreedsCtrl'
                    }
                }
            })
            .state('app.showbreeds2', {
                url: ROUTES.SHOWBREEDS2 + "/:evtId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'showbreeds2.html',
                        controller: 'Showbreeds2Ctrl'
                    }
                }
            })
            .state('app.showbreeds3', {
                url: ROUTES.SHOWBREEDS3 + "/:evtId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'showbreeds3.html',
                        controller: 'Showbreeds3Ctrl'
                    }
                }
            })
            .state('app.showbreeds4', {
                url: ROUTES.SHOWBREEDS4 + "/item?evtId&ringId&dayId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'showbreeds4.html',
                        controller: 'Showbreeds4Ctrl'
                    }
                }
            })
            .state('app.showtrophys', {
                url: ROUTES.SHOWTROPHYS + "/:evtId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'show_trophys.html',
                        controller: 'ShowTrophysCtrl'
                    }
                }
            })
            .state('app.showtrophysfci', {
                url: ROUTES.SHOWTROPHYSFCI + "/item?evtId&fci",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'show_trophys_fci.html',
                        controller: 'ShowTrophysFciCtrl'
                    }
                }
            })
            .state('app.showinfo', {
                url: ROUTES.SHOWINFO + "/:evtId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: 'modules/show-info/show-info.view.html',
                        controller: 'ShowinfoCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.showprogram', {
                url: ROUTES.SHOWPROGRAM + "/:evtId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: 'modules/show-program/show-program.view.html',
                        controller: 'ShowProgramCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.showprogramdetail', {
                url: ROUTES.SHOWPROGRAMDETAIL + "/item?sectionId&eventId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: 'modules/show-program-detail/show-program-detail.view.html',
                        controller: 'ShowProgramDetailCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.breeds', {
                url: ROUTES.BREEDS,
                views: {
                    'menuContent': {
                        templateUrl: tpl + 'breeds.html',
                        controller: 'BreedsCtrl'
                    }
                }
            })
            .state('app.breed', {
                url: ROUTES.BREED + "/item?breedId&eventId&dayId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'breed.html',
                        controller: 'BreedCtrl'
                    }
                }
            })
            .state('app.breedinfo', {
                url: ROUTES.BREEDINFO + "/:breedId",
                views: {
                    'menuContent': {
                        templateUrl: tpl + 'breedinfo.html',
                        controller: 'BreedInfoCtrl'
                    }
                }
            })
            .state('app.breedstats', {
                cache: false,
                url: ROUTES.BREEDSTATS + "/item?breedId&eventId&dayId",
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: tpl + 'breedstats.html',
                        controller: 'BreedStatsCtrl'
                    }
                }
            })
            .state('app.entries', {
                url: ROUTES.ENTRIES + "/item?breedId&eventId&dayId",
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: 'modules/entries/entries.view.html',
                        controller: 'EntriesCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.login', {
                cache: false,
                url: ROUTES.LOGIN,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: 'modules/login/login.view.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.registration', {
                url: ROUTES.REGISTRATION,
                cache: false,
                views: {
                    cache: false,
                    'menuContent': {
                        cache: false,
                        templateUrl: 'modules/registration/registration.view.html',
                        controller: 'RegistrationCtrl',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/news');



    }
})()
