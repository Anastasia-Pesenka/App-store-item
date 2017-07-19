define(['fb', 'radio', 'modules/menu'], function (fb, radio, menu) {
        return {
            init: function () {
                fb.init();
                menu.init();
            }
        };
    });
