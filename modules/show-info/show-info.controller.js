(function() {
    'use strict';

    angular
        .module('ds')
        .controller('ShowinfoCtrl', ShowinfoCtrl);

    ShowinfoCtrl.$inject = ['$rootScope', '$scope', '$http', '$stateParams', 'loader', 'API', '$timeout', 'appVersion'];

    function ShowinfoCtrl($rootScope, $scope, $http, $stateParams, loader, API, $timeout, appVersion) {

        if ("analytics" in window && appVersion == "live") { window.analytics.trackView('INFORMATION') }
        var vm = this;
        vm.evtId = $stateParams.evtId;
        vm.data = {};

        $timeout(function() {
            $http.post(API + "events_info", {
                id: vm.evtId,
                userId: $rootScope.usr.uid,
                maxScreenResolution: screen.availWidth
            }).then(function(response) {
                vm.data.event = response.data[0];
            }).finally(function() {
                loader.hide()
            });
        }, 500);
    }

})()
