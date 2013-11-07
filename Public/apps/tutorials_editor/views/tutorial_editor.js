define([
    'jquery',
    '../../../../../.',
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

            base.editor.setContent(base.tutorial.get('content'));

            base.editor.addAction('Save', function () {
                base.save();
            });
            if (base.editor.hasChanged() || !base.tutorial.get('id')) {
                base.$el.find(".status").html('<i class="fa fa-ellipsis-horizontal"></i> Changed');
            } else {
                base.$el.find(".status").html('<i class="fa fa-check"></i> Synced');
            }
        },
        save: function () {
            var base = this;
            base.tutorial.set('content', base.editor.getMarkdown());
            base.tutorial.set('title', base.$el.find(".title_input").val());
            SmartBlocks.Blocks.Tutorials.Data.tutorials.add(base.tutorial);
            base.$el.find(".status").html('<i class="fa fa-repeat fa-spin"></i> Saving');
            base.tutorial.save({}, {
                success: function () {
                    base.$el.find(".status").html('<i class="fa fa-check"></i> Synced');
                },
                error: function(model, response) {
                    base.$el.find(".status").html('<i class="fa fa-ba"></i> Could not save');
                    base.tutorial.fetch();
                }
            });
        },
        registerEvents: function () {
            var base = this;
            base.tutorial.on("change", function () {
                base.editor.setContent(base.tutorial.get('content'));
            });

            base.editor.events.on('changed', function () {
                if (base.editor.hasChanged()) {
                    base.$el.find(".status").html('<i class="fa fa-ellipsis-horizontal"></i> Changed');
                } else {
                    base.$el.find(".status").html('<i class="fa fa-check"></i> Synced');
                }
            });

            SmartBlocks.Shortcuts.add([
                17, 83
            ], function () {
                base.save();
            });
        }
    });

    return View;
});