define(['fb', 'radio', 'underscore', 'text!templates/tabAbout.html', 'jquery', 'jqueryui'],
    function (fb, radio, _,  aboutTpl, $) {
        return {
            init : function () {
                this.template = _.template(aboutTpl);
                this.$el = $(".about");
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