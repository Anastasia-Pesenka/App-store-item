define(['fb', 'radio', 'underscore', 'text!templates/profile.html', 'jquery', 'jqueryui'],
    function (fb, radio, _,  profileTpl, $) {
        return {
            init : function () {
                this.template = _.template(profileTpl);
                this.$el = $(".profile");
                this.render();
            },
            render : function () {
                this.$el.html(this.template()) ;
            },
            clear : function () {
                this.$el.html('') ;
            }
        }
    });