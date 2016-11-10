(function() {
    'use strict';

    angular
        .module('ds')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ["$scope", "$rootScope", "$ionicHistory", "$state", "$firebaseAuth", "$http", "$ionicSideMenuDelegate", "loader", "API", "appVersion", "firebaseAPI"];

    function LoginCtrl($scope, $rootScope, $ionicHistory, $state, $firebaseAuth, $http, $ionicSideMenuDelegate, loader, API, appVersion, firebaseAPI) {

        if ("analytics" in window && appVersion == "live") { window.analytics.trackView('SIGN IN') }

        var vm = this;

        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        vm.formdata = {
            email: "",
            password: ""
        };
        vm.errors = {};
        vm.authWithFacebook = authWithFacebook;
        vm.authWithGoogle = authWithGoogle;
        vm.authWithEmail = authWithEmail;

        function authHandler(error, authData) {
            var apiUrl = API + "auth";
            if (authData.provider) {
                apiUrl = API + "auth_social";
            }
            $http.post(apiUrl, authData).then(function(response) {
                if (response.data.error) {
                    for (var key in response.data.error) {
                        vm.errors[key] = response.data.error[key];
                    }
                    return;
                }
                var ref = new Firebase("https://fiery-heat-622.firebaseio.com/");
                var auth = $firebaseAuth(ref);
                auth.$authWithPassword({
                    email: 'test@mail.com',
                    password: 'parol'
                }).then(function(authData) {
                    console.log("Logged in as:" + authData.uid);
                    $rootScope.usrLogged = true;
                    $rootScope.usr = response.data;
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
        };

        var ref = new Firebase(firebaseAPI);

        function authWithFacebook() {
            ref.authWithOAuthPopup("facebook", authHandler, {
                remember: "sessionOnly",
                scope: "email,user_location"
            });
        }

        function authWithGoogle() {
            ref.authWithOAuthPopup("google", authHandler, {
                remember: "sessionOnly",
                scope: "email, profile"
            });
        }

        function authWithEmail() {
            if ($scope.formdata.email) {
                authHandler(undefined, $scope.formdata);
            } else {
                $scope.errors.email = "Incorrect email";
            }
        }

        loader.hide();

    }

})();
