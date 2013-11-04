define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorials_home.html',
    './line_thumb'
], function ($, _, Backbone, tutorials_home_tpl, LineThumb) {
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

            var template = _.template(tutorials_home_tpl, {
            });
            base.$el.html(template);

            base.renderTutorials();

        },
        renderTutorials: function () {
            var base = this;
            var tutorials = SmartBlocks.Blocks.Tutorials.Data.tutorials;

            base.$el.find(".latest_tutorials").html("");
            for (var k in tutorials.models) {
                var tutorial = tutorials.models[k];
                var line_thumb = new LineThumb({model: tutorial});
                base.$el.find(".latest_tutorials").append(line_thumb.$el);
                line_thumb.init();
            }
        },
        registerEvents: function () {
            var base = this;

            SmartBlocks.Blocks.Tutorials.Data.tutorials.on('add', function () {
                base.renderTutorials();
            });

            SmartBlocks.Blocks.Tutorials.Data.tutorials.on('remove', function () {
                base.renderTutorials();
            });

            SmartBlocks.Blocks.Tutorials.Data.tutorials.on('change', function () {
                base.renderTutorials();
            });
        }
    });

    return View;
});