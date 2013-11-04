define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorial_editor.html'
], function ($, _, Backbone, tutorial_editor_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "tutorial_editor",
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

            var template = _.template(tutorial_editor_tpl, {
                tutorial: base.tutorial
            });
            base.$el.html(template);

            base.editor = SmartBlocks.Blocks.Markdown.Main.getEditor();
            base.$el.find(".editor_container").html(base.editor.$el);
            base.editor.init();
            base.editor.setTitle(base.tutorial.get('title'));
            base.editor.setContent(base.tutorial.get('content'));

            base.editor.addAction('Save', function () {
                base.tutorial.set('content', base.editor.getMarkdown());
                base.editor.setTitle(base.tutorial.get('title') + " * (syncing)");
                base.tutorial.save({}, {
                    success: function () {
                        base.editor.setTitle(base.tutorial.get('title') + '<i class="fa fa-check"></i>');
                    }
                });
            });
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});