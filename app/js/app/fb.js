define(['firebase', 'module', 'radio'], function (firebase, module, radio) {
    return {
        init: function () {
            firebase.initializeApp(module.config());
        },
        signIn: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                this.userIsAuth = user;
                radio.trigger('userSign', this.userIsAuth);
            }.bind(this)).catch(function (error) {
                // Handle Errors here.
                debugger;
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
            })
        },
        signOut : function () {
            firebase.auth().signOut().then(function() {
                this.userIsAuth=null;
                radio.trigger('userSign', this.userIsAuth);
            }.bind(this)).catch(function(error) {

                // An error happened.
            });
        }
    }
});