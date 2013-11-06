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

            base.renderLatestTutorials();

        },
        renderLatestTutorials: function () {
            var base = this;
            var tutorials = _.first(SmartBlocks.Blocks.Tutorials.Data.tutorials.sortBy(function (tutorial) {
                return - tutorial.getLastUpdate().getTime();
            }), 10);

            base.$el.find(".latest_tutorials").html("");
            for (var k in tutorials) {
                var tutorial = tutorials[k];
                var line_thumb = new LineThumb({model: tutorial});
                base.$el.find(".latest_tutorials").append(line_thumb.$el);
                line_thumb.init();
            }
        },
        registerEvents: function () {
            var base = this;

            SmartBlocks.Blocks.Tutorials.Data.tutorials.on('add', function () {
                base.renderLatestTutorials();
            });

            SmartBlocks.Blocks.Tutorials.Data.tutorials.on('remove', function () {
                base.renderLatestTutorials();
            });

            SmartBlocks.Blocks.Tutorials.Data.tutorials.on('change', function () {
                base.renderLatestTutorials();
            });
        }
    });

    return View;
});