define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorials_home.html'
], function ($, _, Backbone, tutorials_home_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorials_home",
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

            var template = _.template(tutorials_home_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});