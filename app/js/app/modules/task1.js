define(['util', 'jquery', 'jqueryui'], function (util, $) {
    return {
        init: function () {
            this.setupEvents();
            $("#draggable").draggable({
                containment: ".task-1-section",
                revert: true,
                helper: "clone"
            });
            this.classes = ['is-primary', 'is-success', 'is-error', 'is-warning']

        },
        setupEvents: function () {
            this.$el = $(".task-1-section");
            this.$el.on('click', this.clickHandler.bind(this));


        },
        clickHandler: function (e) {
            if (!$(e.target).is(".first, .second, .third, .fourth")) {
                this.$el.find("#draggable").css("background-color", util.getRandomColor());
            }
            if ($(e.target).is(".second")) {
                this.$el.removeClass(this.classes.join(' ')).addClass(this.classes[Math.floor(Math.random() * this.classes.length)]);
            }
            if ($(e.target).is(".third")) {
                $.ajax({
                    url: "data/simpleAjax.json",
                    success: function (data) {
                        alert(data.name);
                    }
                });
            }
            if ($(e.target).is(".fourth")) {
                $.ajax({
                    url: "data/bad.json",
                    statusCode: {
                        404: function () {
                            alert("page not found");
                        }
                    }
                });
            }
        }
    }
});