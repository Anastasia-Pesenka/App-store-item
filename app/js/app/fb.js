define(['firebase', 'module', 'radio'], function (firebase, module, radio) {
    return {
        init : function () {
            firebase.initializeApp(module.config());
        }
    }
});