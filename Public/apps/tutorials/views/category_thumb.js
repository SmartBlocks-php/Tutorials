define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/category_thumb.html'
], function ($, _, Backbone, category_thumb_tpl) {
    var View = Backbone.View.extend({
        tagName: "li",
        className: "category_thumb",
        initialize: function (obj) {
            var base = this;
            base.category = obj.model;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(category_thumb_tpl, {
                category: base.category
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});