angular.module('ds.filters', [])

.filter('newsFilter', function() {
        return function(items, param) {
            var arrayToReturn = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].main_page == param) {
                    arrayToReturn.push(items[i]);
                }
            }
            return arrayToReturn;
        };
    })
    .filter('nameFilter', function() {
        return function(items, param) {
            if (items.length != 1) {
                param = param + "s";
            }
            return param;
        };
    })
    .filter('participantsNameFilter', function() {
        return function(count, param, lng) {
            if (+count != 1 && lng == "en") {
                param = param + "s";
            }
            return param;
        };
    })
    .filter('clearSlash', function($rootScope) {
        return function(str) {
            if (str) {
                var arr = str.split("/"),
                    output = ["", "", ""];
                for (var i = 0; i <= arr.length - 1; i++) {
                    if (arr[i] !== "") {
                        if (i < 1) {
                            output[0] = arr[i];
                        } else if (i == 1) {
                            output[1] = "/" + $rootScope.lang[$rootScope.appLang.type]['result_c2_' + arr[i]];

                        } else {
                            output[2] += "/" + arr[i];
                        }
                    }
                }
                return output.join("");
            }
        };
    });
