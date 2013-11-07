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

            base.renderSearchResults();
        },
        renderSearchResults: function () {
            var base = this;
            var search_query = base.$el.find(".search_input").val();

            var all_tutorials = SmartBlocks.Blocks.Tutorials.Data.tutorials.filter(function (tutorial) {
                return search_query == "" || tutorial.get("title").indexOf(search_query) !== -1;
            });


            base.$el.find(".search_results").html("");
            for (var k in all_tutorials) {
                var tutorial = all_tutorials[k];
                var line_thumb = new LineThumb({model: tutorial});
                base.$el.find(".search_results").append(line_thumb.$el);
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

            var search_timer = 0;
            base.$el.delegate(".search_input", 'keyup', function () {
                clearTimeout(search_timer);
                search_timer = setTimeout(function () {
                    base.renderSearchResults();
                }, 200);
            });
        }
    });

    return View;
});