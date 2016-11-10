angular.module('ds.directives', [])
    .directive('setFocusIf', function($timeout) {
        return {
            restrict: "A",
            link: function($scope, $element, $attr) {
                $scope.$watch($attr.setFocusIf, function(value) {
                    if (value) {
                        $timeout(function() {
                            if ($scope.$eval($attr.setFocusIf)) {
                                $element[0].focus();
                            }
                        }, 0, false);
                    }
                });
            }
        };
    })
    .directive('knob', function() {
        return {
            restrict: "E",
            require: 'ngModel',
            link: function($scope, $element, $attr, ngModel) {
                var total, length, val, animated;
                $scope.$watch(function() {
                    if (ngModel.$modelValue > 0) {
                        total = +$attr.total;
                        length = +ngModel.$modelValue;
                        val = (100 * length) / total;
                        if ($element.val() != val && !animated) {
                            $element
                                .val(0)
                                .knob({
                                    bgColor: $attr.bgColor,
                                    fgColor: $attr.fgColor,
                                    displayInput: $attr.displayInput,
                                    width: $attr.width,
                                    height: $attr.height,
                                    thickness: $attr.thickness,
                                    min: 0,
                                    max: 100,
                                    readOnly: $attr.readOnly,
                                });
                            $({ value: 0 }).animate({ value: val }, {
                                duration: 1000,
                                easing: 'swing',
                                progress: function() {
                                    $element.val(Math.ceil(this.value)).trigger('change');
                                    animated = true
                                }
                            }).promise().then(function() {
                                animated = false
                            });
                        }
                    } else {
                        return;
                    }
                });
            }
        };
    })
    .directive('entrieItem', function() {
        return {
            restrict: "A",
            controller: [
                "$scope",
                "$element",
                "$attrs",
                "$ionicPopup",
                "$http",
                "$rootScope",
                "API",
                "$log",
                "$stateParams",
                function($scope, $element, $attrs, $ionicPopup, $http, $rootScope, API, $log, $stateParams) {

                    function checkFirstCol(cols) {
                        $("[name='r3'],[name='r4'],[name='r5'],[name='r6'],[name='r7']")
                            .attr({
                                "disabled": "disabled"
                            });
                        if (cols.col1 == "-") {
                            $("[name='r2']").removeAttr("disabled");
                        }
                        if (cols.col1 == "4" || cols.col1 == "3" || cols.col1 == "2" || cols.col1 == "1") {
                            $("[name='r2']").removeAttr("disabled");
                            $("[name='r2'][value='G'],[name='r2'][value='NP'],[name='r2'][value='DISQ'],[name='r2'][value='ABS'],[name='r2'][value='M']")
                                .attr({
                                    "disabled": "disabled"
                                });
                        }
                        if (cols.col1 == "") {
                            $("[name='r2']").attr({
                                "disabled": "disabled"
                            });
                        }
                    }

                    function checkSecondCol(cols) {
                        if (cols.col1 == "1" && cols.col2 == "EXC") {
                            $("[name='r3']").removeAttr("disabled");
                            $("[name='r4'],[name='r5'],[name='r6'],[name='r7']")
                                .attr({
                                    "disabled": "disabled"
                                });
                        } else if (cols.col1 == "2" && cols.col2 == "EXC") {
                            $("[name='r3'],[name='r4'],[name='r5'],[name='r6'],[name='r7']")
                                .attr({
                                    "disabled": "disabled"
                                });
                            $("[name='r3'][value='rCAC'],[name='r3'][value='rCACIB']").removeAttr("disabled");
                        } else {
                            $("[name='r3'],[name='r4'],[name='r5'],[name='r6'],[name='r7']")
                                .attr({
                                    "disabled": "disabled"
                                });
                        }
                    }

                    function checkThirdCol(cols) {
                        if (cols.col1 == "1" && cols.col2 == "EXC" && cols.col3 == "CAC") {
                            $("[name='r4'],[name='r5'],[name='r6'],[name='r7']")
                                .attr({
                                    "disabled": "disabled"
                                });
                            $("[name='r4'][value='CACIB'],[name='r4'][value='rCACIB'],[name='r4'][value='JCAC']").removeAttr("disabled");
                        }
                        if (cols.col1 == "1" && cols.col2 == "EXC" && cols.col3 == "rCACIB") {
                            $("[name='r4'],[name='r5'],[name='r6'],[name='r7']")
                                .attr({
                                    "disabled": "disabled"
                                });
                            $("[name='r4'][value='rCAC']").removeAttr("disabled");
                        }
                        if (cols.col1 == "2" && cols.col2 == "EXC" && cols.col3 == "CAC" ||
                            cols.col1 == "1" && cols.col2 == "EXC" && cols.col3 == "rCAC" ||
                            cols.col1 == "2" && cols.col2 == "EXC" && cols.col3 == "rCAC") {
                            $("[name='r4'],[name='r5'],[name='r6'],[name='r7']")
                                .attr({
                                    "disabled": "disabled"
                                });
                            $("[name='r4'][value='CACIB'],[name='r4'][value='rCACIB']").removeAttr("disabled");
                        }


                        if (cols.col1 == "1" && cols.col2 == "EXC" && cols.col3 == "CACIB" ||
                            cols.col1 == "2" && cols.col2 == "EXC" && cols.col3 == "CACIB" ||
                            cols.col1 == "1" && cols.col2 == "EXC" && cols.col3 == "JCAC" ||
                            cols.col1 == "2" && cols.col2 == "EXC" && cols.col3 == "JCAC") {
                            $("[name='r4'],[name='r5'],[name='r6'],[name='r7']")
                                .attr({
                                    "disabled": "disabled"
                                });
                            $("[name='r4'][value='CAC'],[name='r4'][value='rCAC']").removeAttr("disabled");
                        }
                    }

                    function checkChamp(cols) {
                        if (cols.col1 == "1" && cols.col2 == "EXC" && cols.col3 == "CAC" && cols.col4 != "" ||
                            cols.col1 == "1" && cols.col2 == "EXC" && cols.col4 == "CAC") {
                            $("[name='r5']").removeAttr("disabled");
                            if (cols.col5 == "BOB") {
                                $("[name='r6']").removeAttr("disabled");
                                if (cols.col6 == "BIG1") {
                                    $("[name='r7']").removeAttr("disabled");
                                }
                            }
                        } else {
                            $("[name='r5'],[name='r6'],[name='r7']")
                                .attr({
                                    "disabled": "disabled"
                                });
                        }
                    }

                    function clearArea() {
                        $("[disabled='disabled']").removeClass("active");
                        var disSel = $("[disabled='disabled']:checked");
                        disSel.each(function(index, item) {
                            var model = $(item).attr("ng-model");
                            $scope.results[model.split(".")[1]] = "";
                        });
                    }

                    $scope.results = {
                        col1: "",
                        col2: "",
                        col3: "",
                        col4: "",
                        col5: "",
                        col6: "",
                        col7: ""
                    };
                    $scope.change = function($event) {
                        var el = $($event.target),
                            model = $($event.target).attr("ng-model");
                        if ($scope.results[model.split(".")[1]] == el.val()) {
                            if (el.hasClass("active")) {
                                el.removeClass("active").attr("checked", false);
                                $scope.results[model.split(".")[1]] = "";
                            } else {
                                $("[ng-model='" + el.attr("ng-model") + "']").removeClass("active");
                                el.addClass("active")
                            }
                        }
                        checkFirstCol($scope.results);
                        checkSecondCol($scope.results);
                        checkThirdCol($scope.results);
                        checkChamp($scope.results);
                        clearArea();
                    };
                    $scope.sendResult = function(res) {
                        $http.post(API + 'compute_result', {
                            event_id: $attrs.eid,
                            breed_id: $attrs.bid,
                            day_id: $stateParams.dayId,
                            user_id: $attrs.uid,
                            participants_id: $scope.item.id,
                            ring_number: $scope.item.ring_number,
                            result: res
                        }).then(function(response) {
                            $log.log("request to SQL response", response);

                            $scope.item.result = res;
                            if ($rootScope.usr.admin_status == "1") {
                                $scope.item.verified_results = 1;
                            }
                        });
                    };
                    $scope.setResult = function() {
                        $scope.results = {
                            col1: "",
                            col2: "",
                            col3: "",
                            col4: "",
                            col5: "",
                            col6: "",
                            col7: ""
                        };
                        var myPopup = $ionicPopup.show({
                            templateUrl: "templates/setresult.html",
                            cssClass: 'setResult',
                            scope: $scope,
                            buttons: [{
                                text: $rootScope.lang[$rootScope.appLang.type]['cancel'],
                                type: 'button-assertive'
                            }, {
                                text: $rootScope.lang[$rootScope.appLang.type]['save'],
                                type: 'button-positive',
                                onTap: function() {
                                    var item, total = "";
                                    for (item in $scope.results) {
                                        total += ($scope.results[item] + "/");
                                    }
                                    if (total != "///////") {
                                        $scope.sendResult(total)
                                    }
                                }
                            }]
                        });
                    };
                    $scope.showConfirm = function(firebaseResult) {
                        var adm = $rootScope.usr.admin_status;
                        var confirmPopup = $ionicPopup.confirm({
                            cssClass: 'confirmOverride',
                            template: adm ? '{{lang[appLang.type]["admin_confirm_result_popup"]}}' : '{{lang[appLang.type]["change_result_popup"]}}',
                            buttons: [{
                                text: adm ? ($rootScope.lang[$rootScope.appLang.type]['shure_cans']) : $rootScope.lang[$rootScope.appLang.type]['cancel'],
                                type: 'button-assertive',
                                onTap: function() {
                                    return false }
                            }, {
                                text: adm ? ($rootScope.lang[$rootScope.appLang.type]['shure_cont']) : "OK",
                                type: 'button-positive',
                                onTap: function() {
                                    return true }
                            }]
                        });
                        confirmPopup.then(function(res) {
                            if (adm) {
                                if (res) {
                                    $scope.sendResult($scope.item.result || firebaseResult)
                                } else {
                                    $scope.setResult();
                                }
                            } else {
                                if (res) {
                                    $scope.setResult();
                                }
                            }
                        });
                    };
                    $scope.clickSwitch = function(result, result2, admResult, admin, lr) {
                        if (admResult && !admin && lr) {
                            return
                        }
                        if (result && !lr /* || result && !admResult && !lr */ || result2 && !admResult && lr || (result || result2) && admResult && admin && lr) {
                            $scope.showConfirm(result2)
                        } else if (!result) {
                            $scope.setResult();
                        } else {
                            return
                        }
                    };
                    $scope.showDetailInfo = function(id) {
                        var myPopup = $ionicPopup.show({
                            templateUrl: "templates/showdetailinfo.html",
                            cssClass: 'setResult',
                            scope: $scope,
                            buttons: [{
                                text: $rootScope.lang[$rootScope.appLang.type]['close'],
                                type: 'button-positive'
                            }]
                        });
                    };
                }
            ]
        };
    })
    .directive('dogsClassGenderStatistic', function() {
        return {
            restrict: "E",
            scope: {
                item: "=",
                max: "="
            },
            template: '<div class="name">{{$root.lang[$root.appLang.type]["class_"+(item.title).toLowerCase().replace(" ", "_")]}} </div>' +
                '<div class="sexbar">' +
                '<span class="male"  style="width: 0"></span>' +
                '<span class="female"  style="width: 0"></span>' +
                '</div>' +
                '<div class="count">' +
                '<span class="male">{{item.male}}</span>' +
                '/' +
                '<span class="female">{{item.female}}</span>' +
                '</div>',
            link: function($scope, $element) {
                setTimeout(function() {
                    var male = +$scope.item.male,
                        female = +$scope.item.female,
                        max = +$scope.max;
                    $element.find(".sexbar .male").animate({
                        width: ((male * 100) / max) + "%"
                    }, 1000);

                    $element.find(".sexbar .female").animate({
                        width: ((female * 100) / max) + "%"
                    }, 1000);
                }, 1000);
            }
        };
    });
