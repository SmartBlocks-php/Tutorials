define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorials.html'
], function ($, _, Backbone, tutorials_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorials_app",
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

            var template = _.template(tutorials_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});