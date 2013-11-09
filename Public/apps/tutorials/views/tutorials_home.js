define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorials_home.html',
    './line_thumb',
    './category_thumb',
    './featured_thumb'
], function ($, _, Backbone, tutorials_home_tpl, LineThumb, CategoryThumb, FeaturedThumb) {
    /**
     * TutorialsHomeView module.
     *
     * @type {*|extend|extend|void|Object|extend}
     */
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorials_home",
        initialize: function () {
            var base = this;
            base.events = $.extend({}, Backbone.Events);
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        /**
         * Main render method for TutorialsHomeViews
         * @attach{Tutorials.Views.TutorialHomeView, render}
         * @internal
         */
        render: function () {
            var base = this;

            var template = _.template(tutorials_home_tpl, {
            });
            base.$el.html(template);

            base.renderLatestTutorials();
            base.renderFeatured();

        },
        renderFeatured: function () {
            var base = this;

            var featured = _.first(SmartBlocks.Blocks.Tutorials.Data.tutorials.filter(function (tutorial) {
                return tutorial.get("featured");
            }), 5);
            base.$el.find(".featured_tutorials_list").html('');
            for (var k in featured) {
                var featured_thumb = new FeaturedThumb({ model: featured[k] });
                var li = $(document.createElement('li'));
                li.html(featured_thumb.$el);
                base.$el.find(".featured_tutorials_list").append(li);
                featured_thumb.init();
            }
        },
        /**
         * Renders list of latest tutorials
         *
         * @attach{Tutorials.Views.TutorialHomeView, renderLatestTutorials}
         * @internal
         */
        renderLatestTutorials: function () {
            var base = this;
            var tutorials = _.first(SmartBlocks.Blocks.Tutorials.Data.tutorials.sortBy(function (tutorial) {
                return -tutorial.getLastUpdate().getTime();
            }), 9);

            base.$el.find(".latest_tutorials").html("");
            for (var k in tutorials) {
                var tutorial = tutorials[k];
                var line_thumb = new LineThumb({model: tutorial});
                base.$el.find(".latest_tutorials").append(line_thumb.$el);
                line_thumb.init();
            }

            base.renderSearchResults();
            base.renderCategories();
        },
        /**
         * Renders a list of result tutorials from search (input + selected categories)
         *
         * @attach{Tutorials.Views.TutorialHomeView, renderSearchResults}
         * @internal
         */
        renderSearchResults: function () {
            var base = this;
            var search_query = base.$el.find(".search_input").val();

            var all_tutorials = _.first(SmartBlocks.Blocks.Tutorials.Data.tutorials.filter(function (tutorial) {
                return (search_query == "" || tutorial.get("title").toLowerCase().indexOf(search_query.toLowerCase()) !== -1) &&
                    (!base.selected_category ||
                        (tutorial.get('category') &&
                            base.selected_category.get('id')
                                == tutorial.getCategory().get('id')));
            }), 9);


            base.$el.find(".search_results").html("");
            for (var k in all_tutorials) {
                var tutorial = all_tutorials[k];
                (function (tutorial) {
                    var line_thumb = new LineThumb({model: tutorial});
                    base.$el.find(".search_results").append(line_thumb.$el);
                    line_thumb.init();
                    line_thumb.onClick(function () {
                        window.location = "#Tutorials/show/" + tutorial.get('id');
                    });
                })(tutorial);

            }
        },
        /**
         * Renders a list of categories (see /models).
         *
         * Listens to click events on rendered category thumbnails,
         * allowing to select a category in the view.
         *
         * Stores the selected category in View.selected_Category
         *
         * @attach{Tutorials.Views.TutorialHomeView, renderCategories}
         * @internal
         */
        renderCategories: function () {
            var base = this;

            var categories = SmartBlocks.Blocks.Tutorials.Data.categories.models;

            var categories_container = base.$el.find(".categories_list");
            categories_container.html("");
            for (var k in categories) {
                (function (category) {
                    var category_thumb = new CategoryThumb({model: category});
                    categories_container.append(category_thumb.$el);
                    category_thumb.init();
                    category_thumb.$el.click(function () {
                        if (!base.selected_category || base.selected_category.get('id') != category.get('id')) {
                            base.selected_category = category;
                            categories_container.find(".selected").removeClass("selected");
                            category_thumb.$el.addClass("selected");
                        } else {
                            base.selected_category = undefined;
                            categories_container.find(".selected").removeClass("selected");
                        }
                        base.events.trigger("selected_category_change");
                    });
                })(categories[k]);
            }
        },
        /**
         * Register events for the TutorialsHomeView
         *
         * Tutorials.Data.tutorials events (add, remove, change)
         * Search input change
         * TutorialsHomeView.events.selected_category_change
         *
         * @attach{Tutorials.Views.TutorialsHomeView, registerEvents}
         * @internal
         */
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


            base.events.on('selected_category_change', function () {
                base.renderSearchResults();
            });

        }
    });

    return View;
});