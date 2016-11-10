(function() {
    'use strict';

    angular
        .module('ds')
        .controller('ShowProgramDetailCtrl', ShowProgramDetailCtrl);

    ShowProgramDetailCtrl.$inject = ['$scope', '$http', '$stateParams', '$state', 'loader', 'API', '$timeout', 'appVersion', '$rootScope'];

    function ShowProgramDetailCtrl($scope, $http, $stateParams, $state, loader, API, $timeout, appVersion, $rootScope) {

        if ("analytics" in window && appVersion == "live") { window.analytics.trackView('PROGRAM DETAIL') }
        var vm = this;

        vm.evtId = $stateParams.eventId;
        vm.sectionId = $stateParams.sectionId;
        vm.data = {
            program: {}
        };

        $timeout(function() {
            $http.post(API + "event_program_detail", {
                eventId: vm.evtId,
                userId: $rootScope.usr.uid,
                sectionId: vm.sectionId
            }).then(function(response) {
                vm.data.program = response.data[0];
            }).finally(function() {
                loader.hide()
            });
        }, 500);
    }

})()
