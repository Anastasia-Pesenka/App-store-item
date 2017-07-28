define(['fb', 'radio', 'underscore', 'text!templates/menu.html', 'jquery', 'jqueryui'],
    function (fb, radio, _,  menuTpl, $) {
        return {
            init: function (user) {
                this.template = _.template(menuTpl);
                this.$el = $(".menu");
                this.render(user);
                this.setupEvents();
            },
            render: function (user) {
                this.$el.html(this.template({user : user})) ;
            },
            setupEvents : function () {
                radio.on('auth/changed', function (user) {
                    this.render(user);
                }.bind(this));
                this.$el.on('click', this.clickHandler.bind(this));
            },
            clickHandler : function (e) {
                if($(e.target).is('.log-in')){
                    fb.signIn();
                }
                if($(e.target).is('.log-out')){
                    fb.signOut();
                }
                if($(e.target).is('.nav-toggle')){
                    $(e.target).toggleClass("is-active");
                    $(".my-menu").toggleClass("is-active");
                }


            }

        }
    });
