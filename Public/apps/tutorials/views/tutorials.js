define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorials.html',
    './tutorials_home',
    './tutorial_reader',
    './tutorial_editor'
], function ($, _, Backbone, tutorials_tpl, TutorialsHomeView, TutorialReaderView, TutorialEditorView) {
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
        editTutorial: function (tutorial) {
            var base = this;
            if (SmartBlocks.current_user.get('id') == tutorial.getCreator().get('id')) {
                var tutorial_editor = new TutorialEditorView({model: tutorial});
                base.$el.find(".tutorials_content").html(tutorial_editor.$el);
                tutorial_editor.init();
            } else {
                alert("You are not authorized to edit this tutorial");
            }
        },
        newTutorial: function () {
            var base = this;
            var tutorial = new SmartBlocks.Blocks.Tutorials.Models.Tutorial({
                title: "New tutorial"
            });
            if (SmartBlocks.current_user.hasRight("tutorial_writer")) {
                var tutorial_editor = new TutorialEditorView({model: tutorial});
                base.$el.find(".tutorials_content").html(tutorial_editor.$el);
                tutorial_editor.init();
            } else {
                alert("You are not authorized to edit this tutorial");
            }
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