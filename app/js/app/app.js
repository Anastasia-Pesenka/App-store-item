define(['router', 'fb', 'radio', 'modules/menu', 'modules/home'], function (router, fb, radio, menu, home) {
        return {
            init: function () {
                fb.init();
                menu.init();
                router.init();
            }
        };
    });
