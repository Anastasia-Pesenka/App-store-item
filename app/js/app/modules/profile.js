define(['fb', 'radio', 'underscore', 'text!templates/profile.html', 'jquery', 'jqueryui'],
    function (fb, radio, _, profileTpl, $) {
        return {
            init: function () {
                this.template = _.template(profileTpl);
                this.$el = $(".profile");
                this.sortingItems = {};
                this.allItems = {};
                this.setupEvents();
                this.render();
            },
            render: function (items, user) {
                this.$el.html(this.template({items: items, user: user}));
            },
            clear: function () {
                this.$el.html('');
            },
            setupEvents: function () {
                this.$el.on('click', this.clickHandler.bind(this));
                radio.on('auth/changed', this.authChangeHandler.bind(this));
                radio.on('item/got', this.setItem.bind(this));
                radio.on('date/sort', this.sortItems.bind(this));
            },
            clickHandler: function (e) {
                if ($(e.target).is('.del')) {
                    var id = $(e.target).attr("data-id");
                    var path = $(e.target).attr("data-path");
                    fb.deleteItem(id, path);
                }
            },
            authChangeHandler: function (user) {
                if (user) {
                    items = fb.getDBSnapshot();
                    this.render(items, user);
                } else {
                    this.render(null, null);
                }
            },
            setItem: function (items) {
                var user = fb.getCurrentUser();
                this.render(items, user);
            },
            sortItems: function (date) {
                var user = fb.getCurrentUser();
                this.allItems = fb.getDBSnapshot();
                console.log(this.allItems);
                /*for (var id in this.allItems) {
                 console.log(this.allItems[id].date);
                 }*/
            }
        }
    });