define(['underscore', 'text!templates/menu.html', 'jquery', 'jqueryui'],
    function (_,  menuTpl, $) {
        return {
            init: function () {
                this.template = _.template(menuTpl);
                this.$el = $(".menu");

                this.render();
                this.renderTabs();
            },
            render: function () {
                this.$el.html(this.template) ;

            },
            renderTabs: function () {
                $( "#tabs" ).tabs();
            }
        };
    });
