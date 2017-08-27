define(['picker', 'pickerdate', 'radio', 'underscore', 'text!templates/settingsPanel.html', 'jquery'],
    function (picker, pickerdate, radio, _, settingsPanelTpl, $) {
        return {
            init: function () {
                this.template = _.template(settingsPanelTpl);
                this.$el = $(".settingPanel");
                this.dateMimMax = {minDate: {}, maxDate: {}};
                this.render();
                this.setupEvents();
            },
            render: function () {
                this.$el.html(this.template());
                this.setPickers();
            },
            setPickers: function () {
                this.setPickerWithOwnProp("#datepicker1", 'min');
                this.setPickerWithOwnProp("#datepicker2", 'max');
            },
            setPickerWithOwnProp: function (selector, value) {
                $(selector).pickadate({
                    monthsFull: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
                    monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                    weekdaysFull: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
                    weekdaysShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                    today: 'сегодня',
                    clear: 'удалить',
                    close: 'закрыть',
                    firstDay: 1,
                    format: 'd mmmm yyyy г.',
                    formatSubmit: 'yyyy/mm/dd',
                    onSet: function (context) {
                        console.log('Just set stuff:', context);
                        if (value === 'min') {
                            this.dateMimMax.minDate = context
                        }
                        if (value === 'max') {
                            this.dateMimMax.maxDate = context
                        }
                    }.bind(this)
                });
            },
            setupEvents: function () {
                this.$el.on('click', this.clickHandler.bind(this));
            },
            clickHandler: function (e) {
                if ($(e.target).is('.sort')) {
                    if (this.dateMimMax.minDate.select > this.dateMimMax.maxDate.select) {
                        $(".modal").addClass("is-active");
                    } else {
                        radio.trigger('date/sort', this.dateMimMax);
                    }
                }
                if ($(e.target).is('.close')) {
                    $(".modal").removeClass("is-active");
                }
            },
            clear: function () {
                this.$el.html('');
            }
        }
    })