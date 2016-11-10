(function() {
    'use strict';

    angular
        .module('ds')
        .controller('ShowProgramCtrl', ShowProgramCtrl);

    ShowProgramCtrl.$inject = ['$scope', '$http', '$stateParams', '$state', 'loader', 'API', '$timeout', 'appVersion', '$rootScope'];

    function ShowProgramCtrl($scope, $http, $stateParams, $state, loader, API, $timeout, appVersion, $rootScope) {

        if ("analytics" in window && appVersion == "live") { window.analytics.trackView('PROGRAM') }
        var vm = this;
        vm.evtId = $stateParams.evtId;
        vm.data = {
            program: {}
        };

        $timeout(function() {
            $http.post(API + "event_program", {
                eventId: vm.evtId,
                userId: $rootScope.usr.uid,
                maxScreenResolution: screen.availWidth
            }).then(function(response) {
                vm.data.program = response.data[0];
            }).finally(function() {
                loader.hide();
            });
        }, 500);
    }

})()
