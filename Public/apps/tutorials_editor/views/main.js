define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/main.html',
    './listing',
    './tutorial_editor'
], function ($, _, Backbone, main_template, ListingView, TutorialEditorView) {
    /**
     * Tutorials.TutorialsEditor.MainView
     *
     * This view is the container for the TutorialsEditor app.
     *
     * @type {*|extend|extend|void|Object|extend}
     */
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorial_editor_app",
        initialize: function () {
            var base = this;
        },
        /**
         * Initialization method for TutorialsEditor.MainView
         * Renders and registers events;
         */
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        /**
         * @internal
         */
        render: function () {
            var base = this;

            var template = _.template(main_template, {});
            base.$el.html(template);
            base.showListing();
        },
        /**
         * @internal
         */
        registerEvents: function () {
            var base = this;
        },
        /**
         * Shows the listing subapp, which lists tutorials that the user can edit.
         */
        showListing: function () {
            var base = this;
            var listing_view = new ListingView();
            base.$el.find(".editor_app_container").html(listing_view.$el);
            listing_view.init();
        },
        /**
         * Shows an editor, based on the Markdown block's editor, that allows the user
         * to edit a given tutorial.
         * @param Tutorial tutorial
         */
        showEditor: function (tutorial) {
            var base = this;
            var editor_view = new TutorialEditorView({model: tutorial});
            base.$el.find(".editor_app_container").html(editor_view.$el);
            editor_view.init();
        }
    });

    return View;
});