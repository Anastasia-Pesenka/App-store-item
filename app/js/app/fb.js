define(['firebase', 'module', 'radio', 'util'], function (firebase, module, radio, util) {
    return {
        init: function () {
            firebase.initializeApp(module.config());
            this.authenticated = firebase.auth().currentUser || null;
            this.initialized = false;
            this.snapshotDB={};
            this.setupEvents();
        },
        setupEvents: function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    this.setCurrentUser(user);
                    this.listenerDB();
                } else {
                    this.setCurrentUser(null);
                }
                if (!this.initialized) {
                    this.initialized = true;
                    radio.trigger('fb/initialized', user);
                }
            }.bind(this));
        }
        ,
        setCurrentUser: function (user) {
            this.authenticated = user;
            radio.trigger('auth/changed', user);
        },
        getCurrentUser: function () {
            return this.authenticated;
        },
        listenerDB : function () {
            firebase.database().ref('/users/' + this.authenticated.uid + '/info').on('value', function (snapshot) {
                radio.trigger('item/got', snapshot.val());
            });
        },
        getDBSnapshot : function () {
            firebase.database().ref('/users/' + this.authenticated.uid + '/info').once('value').then(function(snapshot) {
                this.snapshotDB = snapshot.val()
            }.bind(this));
            return this.snapshotDB;
        },
        signIn: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
            }.bind(this)).catch(function (error) {
                // Handle Errors here
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
                // Sign-out successful.
            }.bind(this)).catch(function(error) {
                // An error happened.
            });
        },
        saveFile: function (file) {
            var id = util.generateId();
            var metadata = {
                contentType: file.type,
                customMetadata: {
                    id: id
                }
            };
            var uploadTask = firebase.storage().ref('images/' + file.name).put(file, metadata);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                this.uploadingFileProgressHandler,
                this.uploadingFileErrorHandler,
                this.uploadingFileSuccessHandler.bind({fb: this, uploadTask: uploadTask}));
        },

        /**
         * Progress handler of file uploading
         * @param {Object} snapshot
         */
        uploadingFileProgressHandler: function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        },

        /**
         * Error handler of file uploading
         * @param {Object} error
         */
        uploadingFileErrorHandler: function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        },

        /**
         * Success handler of file uploading
         */
        uploadingFileSuccessHandler: function () {
            var fileData = {
                downloadURL: this.uploadTask.snapshot.downloadURL,
                fullPath: this.uploadTask.snapshot.metadata.fullPath
            };
            radio.trigger('img/save', fileData)
        },


        saveItemInfo: function (id, data) {
            firebase.database().ref('users/' + this.authenticated.uid + '/info/' + id).set(data);
        },
        deleteItem : function (id, path) {
            firebase.storage().ref(path).delete()
                .then(function () {

                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
            var ref = firebase.database().ref('/users/' + this.authenticated.uid + '/info/' + id);
            ref.remove();

        }
    }
});