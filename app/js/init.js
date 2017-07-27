requirejs.config({
    baseUrl: 'js/app',
    paths: {
        underscore: '../lib/underscore',
        text: '../lib/text',
        jquery: '../lib/jquery',
        jqueryui: '../lib/jquery-ui',
        firebase: 'https://www.gstatic.com/firebasejs/4.1.3/firebase'
    },
    config: {
        fb: {
            apiKey: "AIzaSyBLRiq7ivvV6pwiw883behfS7-mVlAWkM0",
            authDomain: "myfinalproject-b58cf.firebaseapp.com",
            databaseURL: "https://myfinalproject-b58cf.firebaseio.com",
            projectId: "myfinalproject-b58cf",
            storageBucket: "myfinalproject-b58cf.appspot.com",
            messagingSenderId: "323458626540"
        }
    },
    shim: {
        firebase: {
            exports: 'firebase'
        }
    }

});

requirejs(['app'], function (app) {
    app.init();
});
