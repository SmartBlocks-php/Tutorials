define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/featured_thumb.html'
], function ($, _, Backbone, featured_thumb_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "featured_tutorial_thumb",
        initialize: function (obj) {
            var base = this;
            base.tutorial = obj.model;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(featured_thumb_tpl, {
                tutorial: base.tutorial
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});