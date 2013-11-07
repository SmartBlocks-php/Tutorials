define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/listing.html'
], function ($, _, Backbone, listing_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "listing",
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

            var template = _.template(listing_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});