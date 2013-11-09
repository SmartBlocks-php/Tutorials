define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/line_thumb.html',
    'moment'
], function ($, _, Backbone, line_thumb_tpl, moment) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorial_line_thumb",
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

            var template = _.template(line_thumb_tpl, {
                tutorial: base.tutorial,
                moment: moment
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        },
        /**
         * Sets the action that shall be executed when a user clicks on this line thumbnail.
         * @param callback takes a tutorial as argument
         */
        onClick: function (callback, text) {
            var base = this;
            base.$el.click(function () {
                if (callback) {
                    callback(base.tutorial);
                }
            });
            base.$el.find('.click_text').html(text);
        }
    });

    return View;
});