define(['fb', 'radio', 'util', 'underscore', 'text!templates/addingItemMenu.html', 'jquery', 'jqueryui'],
    function (fb, radio, util, _,  addingItemMenuTpl, $) {
        return {
            init : function () {
                this.template = _.template(addingItemMenuTpl);
                this.$el = $(".addingItemMenu");
                this.render();
                this.setupEvents();
            },
            render : function () {
                this.$el.html(this.template()) ;
            },
            clear : function () {
                this.$el.html('') ;
            },
            setupEvents : function () {
                this.$el.on('click', this.addHandler.bind(this));
            },
            addHandler : function (e) {
                if($(e.target).is('.add')){
                    var input= $('.input-files').get(0);

                    var file = input.files;
                    for (var i = 0; i < file.length; i++) {
                        fb.saveFile(file[i]);
                    }
                    radio.on('img/save', this.addTask);
                }
            },
            addTask: function (imgRef) {
                var info = $('.item-info').get(0).value;
                if (imgRef && info) {
                    var id = util.generateId();
                    var data = {
                        description: info,
                        ref: imgRef
                    };
                    fb.saveItemInfo(id, data);
                }
            },
        }
    });