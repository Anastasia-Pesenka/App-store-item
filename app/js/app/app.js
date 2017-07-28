define(['router', 'fb', 'radio', 'modules/menu'], function (router, fb, radio, menu) {
        return {
            init: function () {
                radio.on('fb/initialized', this.initializeModules);
                fb.init();
            },
            initializeModules : function (user) {
                menu.init(user);
                router.init(user);
            }
        };
    });
