define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/line_thumb.html'
], function ($, _, Backbone, line_thumb_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorial_line_thumb",
        initialize: function () {
            var base = this;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(line_thumb_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});