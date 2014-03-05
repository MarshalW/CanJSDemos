require.config({
    paths: {
        jquery: 'jquery-2.1.0.min'
    }
});

require(['can'], function (can) {
    var Info = can.Model({
        findOne: 'GET /info/{id}',
        update: 'PUT /info/{id}'
    }, {});

    can.fixture({
        'GET /info/{id}': function () {
            return {
                id: 1,
                place: '奥利匹克森林公园',
                aqi: '283',
                desc: "重度污染"
            }
        },
        'PUT /info/{id}': function () {
            return {
            };
        }
    });

    //信息显示控件
    var InfoWidget = can.Control({
        init: function () {
            this.render();
            var self = this;
            Info.bind('updated', function () {
                self.render();
            });
//            this.options.info.bind('change', function (event, attr, how, newVal, oldVal) {
//                console.log('>>>>>>>change:'+attr);
//            });

        },
        render: function () {
            this.element.html(can.view('../views/info.ejs', this.options.info));
        }
    });

    //表单显示控件
    var FormWidget = can.Control({
        init: function (el, info) {
            this.render();
            var self = this;
            Info.bind('updated', function (event,updated) {
                if(updated.id==self.options.info.id){
                    self.render();
                }
            });
        },
        render: function () {
            this.element.html(can.view('../views/form.ejs', this.options.info));
        },
        'button click': function () {
            var form = this.element.find('input');
            var values = can.deparam(form.serialize());
            console.log(values);
//            this.options.info.attr(values);
            this.options.info.attr(values).save();
        }
    });

    Info.findOne({id: 1}, function (info) {
        new InfoWidget('#info', {info: info});
        new FormWidget('#form', {info: info});
    });
});
