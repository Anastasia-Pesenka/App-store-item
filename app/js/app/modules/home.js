define(['fb', 'radio', 'underscore', 'text!templates/home.html', 'jquery', 'jqueryui'], 
function (fb, radio, _,  homeTpl, $) {
    return {
        init : function () {
            this.template = _.template(homeTpl);
            this.$el = $(".home");
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