(function() {
    'use strict';

    angular
        .module('ds')
        .controller('RegistrationCtrl', RegistrationCtrl);

    RegistrationCtrl.$inject = ['$scope', '$rootScope', '$ionicHistory', '$state', '$http', 'loader', 'API', 'appVersion', '$firebaseAuth'];

    function RegistrationCtrl($scope, $rootScope, $ionicHistory, $state, $http, loader, API, appVersion, $firebaseAuth) {
        if ("analytics" in window && appVersion == "live") { window.analytics.trackView('REGISTER') }
        // AdMob.hideBanner();

        var vm = this;
        vm.errors = {};
        vm.formdata = {
            first_name: "",
            last_name: "",
            country: "",
            email: "",
            password: "",
            password2: ""
        };
        vm.registrate = registrate;

        function registrate() {
            vm.errors = {};
            var errCount = 0;
            var lat = /^[0-9a-z\s'&]*$/i;
            var mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            for (var key in vm.formdata) {
                if (vm.formdata[key] == "") {
                    vm.errors[key] = "This field is required";
                    errCount++;
                }
            }

            if (vm.formdata.password != vm.formdata.password2) {
                vm.errors.password2 = "Passwords doesn't match.";
                errCount++;
            }
            if (vm.formdata.password.length < 8) {
                vm.errors.password = "Password is too short. Minimum is 8 symbols";
                errCount++;
            }
            if (!(lat.test(vm.formdata.first_name))) {
                vm.errors.first_name = "You must enter your information using Latin characters. Please try again";
                errCount++;
            }
            if (!(lat.test(vm.formdata.last_name))) {
                vm.errors.last_name = "You must enter your information using Latin characters. Please try again";
                errCount++;
            }
            if (!(mail.test(vm.formdata.email))) {
                vm.errors.email = "Not valid email address";
                errCount++;
            }

            if (errCount == "0") {
                $http.post(API + "registration", vm.formdata).then(function(response) {
                    if (response.data.error) {
                        for (var key in response.data.error) {
                            vm.errors[key] = response.data.error[key][0];
                        }
                        return;
                    }
                    var ref = new Firebase("https://fiery-heat-622.firebaseio.com/");
                    var auth = $firebaseAuth(ref);

                    auth.$authWithPassword({
                        email: 'mydogshowapp@gmail.com',
                        password: 'myd0gsh0w2pp1!'
                    }).then(function(authData) {
                        console.log("Logged in as:" + authData.uid);
                        $rootScope.usr = response.data;
                        $rootScope.usrLogged = true;
                        localStorage.setItem("usrLogged", $rootScope.usrLogged)
                        localStorage.setItem("usr", JSON.stringify(response.data));
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $rootScope.updateShowsCounter();
                        $state.go("app.news");
                    }).catch(function(error) {
                        alert("Authentication failed:" + error.message);
                    });
                });
            }
        };
        loader.hide();

    }

})();
