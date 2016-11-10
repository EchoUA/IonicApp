(function() {
    'use strict';

    angular
        .module('ds')
        .controller('EntriesCtrl', EntriesCtrl);

    EntriesCtrl.$inject = ["$scope", "$rootScope", "$stateParams", "$ionicPopup", "$http", "_", "$ionicHistory", "$firebaseObject", "$ionicScrollDelegate", "$ionicPosition", "loader", "API", "$state", "firebaseAPI", "$timeout", "appVersion", "$log"];

    function EntriesCtrl($scope, $rootScope, $stateParams, $ionicPopup, $http, _, $ionicHistory, $firebaseObject, $ionicScrollDelegate, $ionicPosition, loader, API, $state, firebaseAPI, $timeout, appVersion, $log) {

        if ("analytics" in window && appVersion = appLang = "live") {
            window.analytics.trackView('ENTRIES & RESULTS');
        }

        var vm = this;

        vm.filterFCI = filterFCI;
        vm.enchodePN = enchodePN;
        vm.loadMore = loadMore;

        $ionicHistory.clearCache();

        function filterFCI(field1, field2) {
            if (field2 === "" || field2 === null) return true;
            return field1.toString() === field2.toString();
        };

        function enchodePN(pn) {
            var tmp_str = pn;
            // $log.log("tmp_str", tmp_str);
            tmp_str = tmp_str.replace(/\//gi, "_");
            // $log.log("tmp_str", tmp_str);
            tmp_str = tmp_str.replace(/\s/gi, "@");
            // $log.log("tmp_str", tmp_str);
            tmp_str = tmp_str.replace(/\./gi, "*");
            // $log.log("tmp_str", tmp_str);
            tmp_str = tmp_str.replace(/#/gi, "^");
            // $log.log("tmp_str", tmp_str);
            return tmp_str;
        };
        vm.data = {
            pp: { isEmpty: true, draft_mode: false },
            firebase_results: {},
            eventId: $stateParams.eventId,
            breedId: $stateParams.breedId,
            dayId: $stateParams.dayId,
            noMoreNews: false
        };
        vm.data.pageLoaded = true;
        vm.filter = {
            class: ""
        };
        vm.data.classnames = {
            dog_class1: "Minor Puppy",
            dog_class2: "Puppy",
            dog_class3: "Junior",
            dog_class4: "Intermediate",
            dog_class5: "Open",
            dog_class6: "Champion",
            dog_class7: "Veteran",
            dog_class8: "Working",
            dog_class9: "Breeders",
        };
        $timeout(function() {
            $http.post(API + "event_participians", {
                breedId: $stateParams.breedId,
                eventId: $stateParams.eventId,
                day: $stateParams.dayId,
                userId: $rootScope.usr.uid,
                startPoint: 0,
                maxScreenResolution: screen.availWidth,
            }).then(function(response) {
                vm.data.pp = response.data[0] || response.data;
                $log.log("vm.data.pp", vm.data.pp);
                vm.settings.liveresult = response.data[0].live_result;
                $log.log("vm.settings.liveresult", vm.settings.liveresult);
                vm.data.pp.isEmpty = (function() {
                    for (var prop in vm.data.pp.participants) {
                        $log.log("prop", prop);
                        $log.log("vm.data.pp.participants", vm.data.pp.participants);
                        return false
                    }
                    return true
                })()

                $log.log("vm.data.pp.isEmpty", vm.data.pp.isEmpty);

                angular.forEach(vm.data.pp.participants, function(value, key) {
                    $log.log("angular.forEach", value, key);
                });

                var ref = new Firebase(firebaseAPI + "results/" + $stateParams.eventId + "/" + $stateParams.dayId + "/" + $stateParams.breedId);
                $log.log($stateParams.eventId, $stateParams.dayId, $stateParams.breedId);

                vm.data.firebase_results = $firebaseObject(ref);
                $log.log("vm.data.firebase_results", vm.data.firebase_results);
                vm.data.pageLoaded = true;
            }).finally(function() {
                vm.data.pageLoaded = false;
                loader.hide()
            });
        }, 500);

        var qwerty = new Firebase(firebaseAPI + "results/64/1/46/NHKLM059");
        vm.zzz = $firebaseObject(qwerty);

        function loadMore() {
            if (vm.data.pp && vm.data.pp.participants && vm.data.pp.participants.length) {
                $http.post(API + "event_participians", {
                    breedId: $stateParams.breedId,
                    eventId: $stateParams.eventId,
                    day: $stateParams.dayId,
                    userId: $rootScope.usr.uid,
                    startPoint: vm.data.pp.participants.length,
                    maxScreenResolution: screen.availWidth,
                }).then(function(response) {
                    vm.data.pp.participants = vm.data.pp.participants.concat(response.data[0].participants);

                    if (response.data[0].participants.length === 0) {
                        vm.data.noMoreNews = true;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            } else {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }

        vm.settings = {
            liveresult: false
        };

        vm.func = {
            unlocRealtime: function() {
                if (vm.settings.liveresult) {
                    vm.settings.liveresult = true;
                    afterToggle(vm.settings.liveresult);
                } else {
                    vm.settings.liveresult = true;
                    confirmPopup = $ionicPopup.confirm({
                        cssClass: 'unlocRealtime',
                        template: '{{lang[appLang.type]["unlock_result_popup_text"]}}',
                        buttons: [{
                            text: $rootScope.lang[$rootScope.appLang.type]['shure_no'],
                            type: 'button-assertive',
                            onTap: function() {
                                return false
                            }
                        }, {
                            text: $rootScope.lang[$rootScope.appLang.type]['shure_yes'],
                            type: 'button-positive',
                            onTap: function() {
                                return true
                            }
                        }]
                    });
                    confirmPopup.then(function(res) {
                        if (res) {
                            vm.settings.liveresult = false;
                            afterToggle(false);
                        } else {
                            vm.settings.liveresult = true;
                            afterToggle(vm.settings.liveresult);
                        }
                    });
                }

                function afterToggle(res) {
                    $http.post(API + "event_payment", {
                        breedId: $stateParams.breedId,
                        eventId: $stateParams.eventId,
                        userId: $rootScope.usr.uid,
                        purchaseToken: "undefined",
                        purchaseId: "undefined",
                        purchaseProvider: "undefined",
                        status: (res ? 1 : 0)
                    });
                }
            },
            payment: function() {
                return true;
            }
        }

    }
})();
