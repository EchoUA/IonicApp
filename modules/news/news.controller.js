(function() {
    'use strict';

    angular
        .module('ds')
        .controller('NewsCtrl', NewsCtrl);

    NewsCtrl.$inject = ['$scope', '$ionicSlideBoxDelegate', '_', '$http', 'loader', 'API', '$timeout', '$ionicScrollDelegate', 'appVersion', '$log'];

    function NewsCtrl($scope, $ionicSlideBoxDelegate, _, $http, loader, API, $timeout, $ionicScrollDelegate, appVersion, $log) {

        var vm = this;
        vm.prevSlide = prevSlide;
        vm.nextSlide = nextSlide;
        vm.slideChange = slideChange;
        vm.slide2Change = slide2Change;
        vm.doRefresh = doRefresh;

        if ("analytics" in window && appVersion == "live") { window.analytics.trackView('NEWS') }


        function prevSlide() {
            $ionicSlideBoxDelegate.$getByHandle("main-slider").previous();
        };
        function nextSlide() {
            $ionicSlideBoxDelegate.$getByHandle("main-slider").next();
        };
        function slideChange($index) {
            $ionicSlideBoxDelegate.$getByHandle("placeholder").slide($index, 0)
        }
        function slide2Change($index) {
            $ionicSlideBoxDelegate.$getByHandle("main-slider").slide($index, 0)
        }
        $scope.$on("$destroy", function() {
            clearInterval(window.carouselTimer);
            delete window.carouselTimer;
        });

        $scope.$watch(function() {
            return window.innerWidth;
        }, function(value) {
            $ionicSlideBoxDelegate.update();
        });
        vm.data = {
            news: [],
            mainnews: [],
            noMoreNews: false
        };
        $timeout(function() {
            $http.post(API + "news", {
                maxScreenResolution: screen.availWidth,
                startPoint: 0
            }).then(function(response) {
                vm.data.mainnews = response.data.main_news;
                vm.data.news = response.data.other_news;
                $ionicSlideBoxDelegate.update();
            }).finally(function() {
                loader.hide()
            });
        }, 500);
        function doRefresh() {
            $http.post(API + "news", {
                maxScreenResolution: screen.availWidth,
                startPoint: 0
            }).then(function(response) {
                vm.data.mainnews = response.data.main_news;
                vm.data.news = response.data.other_news;
                $ionicSlideBoxDelegate.update();
            }).finally(function() {
                vm.data.noMoreNews = false;
                vm.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.loadMore = _.throttle(function() {
            if (vm.data.news.length !== 0) {
                $http.post(API + "news", {
                    maxScreenResolution: screen.availWidth,
                    startPoint: vm.data.news.length
                }).then(function(response) {
                    vm.data.news = vm.data.news.concat(response.data.other_news);
                    if (response.data.other_news.length === 0) {
                        vm.data.noMoreNews = true;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            } else {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }, 5000);
    }

})()
