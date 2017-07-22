define(['fb', 'radio', 'underscore', 'text!templates/menu.html', 'jquery', 'jqueryui'],
    function (fb, radio, _,  menuTpl, $) {
        return {
            init: function () {
                this.template = _.template(menuTpl);
                this.$el = $(".menu");
                this.render(null);
                this.setupEvents();
            },
            render: function (user) {
                this.$el.html(this.template({user : user})) ;
            },
            setupEvents : function () {
                radio.on('userSign', function (user) {
                    console.log(user);
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

            }

        }
    });
