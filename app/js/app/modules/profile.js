define(['fb', 'radio', 'underscore', 'text!templates/profile.html', 'jquery', 'jqueryui'],
    function (fb, radio, _,  profileTpl, $) {
        return {
            init : function () {

                this.template = _.template(profileTpl);
                this.$el = $(".profile");
                this.items = {};
                this.render();
                this.setupEvents();
            },
            render : function (items) {
                var user = fb.getCurrentUser();
                this.$el.html(this.template({items : items, user : user})) ;
            },
            clear : function () {
                this.$el.html('') ;
            },
            setupEvents : function () {
                radio.on('item/got', this.setItem.bind(this));
            },
            setItem : function (items) {
                debugger;
                this.render(items);
            }
        }
    });