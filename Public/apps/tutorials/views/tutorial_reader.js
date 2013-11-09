define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorial_reader.html'
], function ($, _, Backbone, tutorial_reader_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorial_reader",
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

            var template = _.template(tutorial_reader_tpl, {
                tutorial: base.tutorial
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.tutorial.on("change", function () {
                base.render();
            });
        }
    });

    return View;
});