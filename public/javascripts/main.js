require.config({
    paths: {
        jquery: 'jquery-2.1.0.min'
    }
});

require(['can'], function (can) {
    var Info = can.Model({
        findOne: 'GET /info/{id}'
    }, {});

//    can.fixture({
//        'GET /info/{id}.json': function () {
//            return {
//                id: 1,
//                place: '北京 - 奥利匹克森林公园',
//                aqi: 283,
//                desc: "重度污染"
//            }
//        }
//    });

    var InfoWidget = can.Control({
        init: function () {
            var el = this.element;
            Info.findOne({id: 1},function (data) {
                el.html(can.view('../views/info.ejs', data));
            },function(xhr){
                console.log(xhr);
            });
        }
    });

    var infoWidget = new InfoWidget('#content');
});