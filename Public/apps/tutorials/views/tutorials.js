define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorials.html',
    './tutorials_home',
    './tutorial_reader'
], function ($, _, Backbone, tutorials_tpl, TutorialsHomeView, TutorialReaderView) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorials_app",
        initialize: function () {
            var base = this;
            base.block = SmartBlocks.Blocks.Tutorials;
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
        showHome: function () {
            var base = this;
            var tutorials_home = new TutorialsHomeView();
            base.$el.find(".tutorials_content").html(tutorials_home.$el);
            tutorials_home.init();
        },
        showTutorial: function (tutorial) {
            var base = this;
            var tutorials_reader = new TutorialReaderView({ model: tutorial });
            base.$el.find(".tutorials_content").html(tutorials_reader.$el);
            tutorials_reader.init();
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate('.createtuto', 'click', function () {
                window.location = "#Tutorials/new"
            });
        }
    });

    return View;
});