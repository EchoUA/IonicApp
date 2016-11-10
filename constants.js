(function() {
    'use strict';

    angular.module('ds')
        .constant('ROUTES', (function() {
            return {
                MAIN: '/app',

                NEWS: '/news',

                JUDGE: '/judge',

                SNE: '/shows-n-entries',
                SHOWBREEDS: '/showbreeds',
                SHOWBREEDS2: '/showbreeds2',
                SHOWBREEDS3: '/showbreeds3',
                SHOWBREEDS4: '/showbreeds4',
                SHOWINFO: '/showinfo',
                SHOWPROGRAM: '/showprogram',
                SHOWPROGRAMDETAIL: "/showprogramdetail",

                BREEDS: '/breeds',
                BREED: '/breed',
                BREEDINFO: '/breedinfo',
                BREEDSTATS: '/breedstats',
                SHOWTROPHYS: '/showtrophys',
                SHOWTROPHYSFCI: '/showtrophysfci',

                ENTRIES: '/entries',

                LOGIN: '/login',
                REGISTRATION: '/registration'
            };
        })())
        .constant('appVersion', (function() {
            var appVersion = {
                dev: "dev",
                live: "live"
            };
            return appVersion.live;
        })());
})();
