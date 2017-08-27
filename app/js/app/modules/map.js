define(['radio', 'underscore', 'jquery', 'fb'],
    function (radio, _, $, fb) {
        return{
            init : function () {
                this.$el = $(".map");
                this.myMap = new ymaps.Map("map", {
                    center: [53.90, 27.55],
                    zoom: 11
                });
                this.setupEvents();
            },
            setupEvents: function () {
                radio.on('auth/changed', this.authChangeHandler.bind(this));
                radio.on('item/got', this.renderPlacemarks.bind(this));
            },
            authChangeHandler: function (user) {
                if(user) {
                    setTimeout( function() {
                        this.initialCoordinates=fb.getDBSnapshot();
                        this.createPlacemarks(this.initialCoordinates);
                        }.bind(this), 3000);
                } else {
                    this.createPlacemarks(null);
                }
            },
            renderPlacemarks: function (items) {
                this.createPlacemarks(items);
            },
            createPlacemarks: function (items) {
                this.myMap.geoObjects.removeAll();
                for (var id in items) {
                    var myPlacemark = new ymaps.Placemark(items[id].itemCoordinates, {
                        hintContent: items[id].description,
                        balloonContent: items[id].description
                    });
                    this.myMap.geoObjects.add(myPlacemark);
                }
            },
            clear : function () {
                this.myMap.destroy();
                this.$el.html('') ;
            }
        }
    }
)