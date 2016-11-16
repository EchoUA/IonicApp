'use strict';

describe('LoginCtrl', function() {
    beforeEach(module('ds'));

    var $controller,
        $rootScope,
        LoginCtrl,
        $httpBackend,
        $firebaseAuth,
        $http, auth, $q, deferred;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, $injector, _$firebaseAuth_, _$http_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $http = _$http_;
        $q = _$q_;
        $firebaseAuth = _$firebaseAuth_;
        $httpBackend = $injector.get('$httpBackend');

        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        LoginCtrl = $controller('LoginCtrl', {
            $scope: $rootScope.$new()
        });
    }));

    it('Check is login controller defined', function() {
        expect(LoginCtrl).toBeDefined();
    });

    it("should make success post to http://showadmin.mydogshowapp.com/api/v1/auth", function() {
        expect(LoginCtrl.authWithEmail).toBeDefined();
        $httpBackend.whenPOST('http://showadmin.mydogshowapp.com/api/v1/auth').respond(200);
    })

    it("should make success post to https://fiery-heat-622.firebaseio.com/", function() {

        var ref = new Firebase("https://fiery-heat-622.firebaseio.com/");
        var auth = $firebaseAuth(ref);
        auth.$authWithPassword = jasmine.createSpy();


        // var data3 ={};

        var data = {
            email: 'mydogshowapp@gmail.com',
            password: 'myd0gsh0w2pp1!'
        }

        auth.$authWithPassword(data);

        expect(auth).toBeDefined();
        expect(auth.$authWithPassword).toHaveBeenCalledWith({
            email: 'mydogshowapp@gmail.com',
            password: 'myd0gsh0w2pp1!'
        });

    });
});
