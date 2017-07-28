define(['modules/home', 'modules/tabAbout', 'modules/profile', 'modules/addingItemMenu'], function (home, about, profile, addingItemMenu) {
    return {
        currentRout: {},
        routes: [
            {
                match: '',
                onEnter: function () {
                    console.log('onEnter home');
                    home.init();
                },
                onLeave: function () {
                    console.log('onLeave home');
                    home.clear();
                }
            },
            {
                match: 'home',
                onEnter: function () {
                    console.log('onEnter home');
                    home.init();
                },
                onLeave: function () {
                    console.log('onLeave home');
                    home.clear();
                }
            },
            {
                match: 'about',
                onEnter: function () {
                    console.log('onEnter about');
                    about.init();
                },
                onLeave: function () {
                    console.log('onLeave about');
                    about.clear();
                }
            },
            {
                match: 'profile',
                onEnter: function () {
                    console.log('onEnter home');
                    addingItemMenu.init();
                    profile.init();
                },
                onLeave: function () {
                    console.log('onLeave home');
                    addingItemMenu.clear();
                    profile.clear();
                }
            },
        ],
        init: function () {
            window.addEventListener('hashchange', function () {
                    this.handleUrl(window.location.hash);
                }.bind(this)
            );
            this.handleUrl(window.location.hash);
        },

        findPreviousRoute: function () {
            return this.currentRoute;
        },

        findNewActiveRoute: function (url) {
            return this.routes.find(function (routeItem) {
                return url === routeItem.match;
            });
        },

        handleUrl: function (activeUrl) {
            var url = activeUrl.slice(1);
            var previousRoute = this.findPreviousRoute();
            var newRoute = this.findNewActiveRoute(url);

            Promise.resolve()
                .then(function () {
                    previousRoute && previousRoute.onLeave && previousRoute.onLeave()
                })
                .then(function () {
                    newRoute && newRoute.onEnter && newRoute.onEnter()
                })
                .then(function () {
                    this.currentRoute = newRoute || {};
                    console.log('%c route is changed: current route - ' + (this.currentRoute.match || '#'), 'background: #222; color: #bada55');
                }.bind(this));
        }
    }
});
