(function() {
    'use strict';

    angular
        .module('ds', [
            'ionic',
            'ui.router',
            'ds.controllers',
            'ds.services',
            'ds.filters',
            'underscore',
            'ionicLazyLoad',
            'ngCordova',
            'ngIOS9UIWebViewPatch'
        ]);

})();
