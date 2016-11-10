(function() {
    'use strict';

    angular
        .module('ds')
        .controller('NewsItemCtrl', NewsItemCtrl);

    NewsItemCtrl.$inject = ['$scope', '$stateParams', '$http', 'loader', 'API', '$timeout', '$ionicScrollDelegate', 'appVersion', '$ionicPopup', '$sce', '$cordovaSocialSharing'];

    function NewsItemCtrl($scope, $stateParams, $http, loader, API, $timeout, $ionicScrollDelegate, appVersion, $ionicPopup, $sce, $cordovaSocialSharing) {

        var vm = this;

        // AdMob.showBanner();
        vm.data = {};
        vm.showVideo = false;
        vm.trusted = trusted;
        vm.stopVideo = stopVideo;
        vm.playVideo = playVideo;
        vm.doRefresh = doRefresh;
        vm.shareArticle = shareArticle;

        function trusted(url) {
            if (url) {
                return $sce.trustAsResourceUrl(url.replace("watch?v=", "embed/") + '?enablejsapi=1');
            }
        }

        function stopVideo() {
            $(".videopopup").css("display", "none");
            document.getElementsByTagName('iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }

        function playVideo() {
            console.log($(".videopopup"))
            $(".videopopup").css("display", "block");
        }

        function getArticle() {
            return $http.post(API + "news/" + $stateParams.newsId, {
                maxScreenResolution: screen.availWidth
            }).then(function(response) {
                vm.data.article = response.data[0];
                if ("analytics" in window && appVersion == "live") { window.analytics.trackView('NEWS ARTICLE') }
            });
        };
        $timeout(function() {
            getArticle().finally(function() {
                loader.hide()
            });
        }, 500);

        function doRefresh() {
            getArticle();
            $scope.$broadcast('scroll.refreshComplete');
        };

        function shareArticle(html, image) {
            var text, tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            text = tmp.textContent || tmp.innerText || "";
            window.plugins.socialsharing.share(text, null, image, null);
        };

    }
})();
