define(['picker', 'pickerdate', 'fb', 'radio', 'util', 'underscore', 'text!templates/addingItemMenu.html', 'jquery'],
    function (picker, pickerdate, fb, radio, util, _,  addingItemMenuTpl, $) {
        return {
            init : function () {
                this.template = _.template(addingItemMenuTpl);
                this.$el = $(".addingItemMenu");
                this.selectedDate = {};
                this.render();
                this.setupEvents();
            },
            render : function () {
                this.$el.html(this.template()) ;
                this.setPicker();
            },
            setPicker : function () {
                $("#datepicker").pickadate({
                    monthsFull: [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
                    monthsShort: [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек' ],
                    weekdaysFull: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
                    weekdaysShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ],
                    today: 'сегодня',
                    clear: 'удалить',
                    close: 'закрыть',
                    firstDay: 1,
                    format: 'd mmmm yyyy г.',
                    formatSubmit: 'yyyy/mm/dd',
                    onSet: function(context) {
                        console.log('Just set stuff:', context, this);
                        this.selectedDate = context;
                    }.bind(this)
                });
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
                    radio.on('img/save', this.addTask.bind(this));

                }
            },
            addTask: function (imgRef) {
                var info = $('.item-info').get(0).value;
                var dateLabel =  $("#datepicker").get(0).value;
                if (imgRef && info) {
                    var id = util.generateId();
                    var data = {
                        description: info,
                        date: this.selectedDate.select,
                        dateLabel: dateLabel,
                        ref: imgRef
                    };
                    fb.saveItemInfo(id, data);
                }
                $(".input-files").val("");
                $(".item-info").val("");
                $("#datepicker").val("");
            },
            clear : function () {
                this.$el.html('') ;
            }
        }
    });