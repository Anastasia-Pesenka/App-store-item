define(['radio', 'modules/menu', 'fb'], function (radio, menu, fb) {
        return {
            init: function () {
                fb.init();
                menu.init();
            }
        };
    });
