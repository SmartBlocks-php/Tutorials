define([
    'jquery',
    'underscore',
    'backbone',
    './apps/tutorials/views/tutorials',
    './apps/tutorials_editor/views/main'
], function ($, _, Backbone, TutorialsView, TutorialsEditorView) {
    var main = {
        init: function () {
            SmartBlocks.events.on("ws_notification", function (message) {
                if (message.block == "Tutorials") {
                    if (message.message == "updated_tutorial") {
                        var id = message.tutorial.id;
                        var tutorial = SmartBlocks.Blocks.Tutorials.Data.tutorials.get(id);
                        if (tutorial) {
                            tutorial.fetch();
                        } else {
                            tutorial = new SmartBlocks.Blocks.Tutorials.Model.Tutorial();
                            tutorial.set('id', id);
                            tutorial.fetch();
                            SmartBlocks.Blocks.Tutorials.Data.tutorials.add(tutorial);
                        }
                    }
                    if (message.message == "deleted_tutorial") {
                        var id = message.tutorial.id;
                        var tutorial = SmartBlocks.Blocks.Tutorials.Data.tutorials.get(id);
                        if (tutorial) {
                            SmartBlocks.Blocks.Tutorials.Data.tutorials.remove(tutorial);
                        }
                    }
                }
            });

        },
        launch_tutorials : function (app) {
            var tutorials_view = new TutorialsView();
            SmartBlocks.Methods.render(tutorials_view.$el);
            tutorials_view.init();

            app.initRoutes({
                "" : function () {
                    tutorials_view.showHome();
                },
                "show/:id" : function (id) {
                    var tutorial = SmartBlocks.Blocks.Tutorials.Data.tutorials.get(id);
                    tutorials_view.showTutorial(tutorial);
                },
//                "edit/:id" : function (id) {
//                    var tutorial = SmartBlocks.Blocks.Tutorials.Data.tutorials.get(id);
//                    tutorials_view.editTutorial(tutorial);
//                },
//                "new" : function () {
//                    tutorials_view.newTutorial();
//                }
            });
        },
        launch_tutorials_editor: function (app) {
            var tutorials_editor_view = new TutorialsEditorView();
            SmartBlocks.Methods.render(tutorials_editor_view.$el);
            tutorials_editor_view.init();

            app.initRoutes({
                "": function () {
                    tutorials_editor_view.showListing();
                },
                "edit/:id": function (id) {
                    var tutorial = SmartBlocks.Blocks.Tutorials.Data.tutorials.get(id);
                    if (tutorial) {
                        tutorials_editor_view.showEditor(tutorial);
                    }
                },
                "new" : function () {
                    var base = this;
                    var tutorial = new SmartBlocks.Blocks.Tutorials.Models.Tutorial({
                        title: "New tutorial"
                    });
                    if (SmartBlocks.current_user.hasRight("tutorial_writer")) {
                        tutorials_editor_view.showEditor(tutorial);
                    } else {
                        alert("You are not authorized to edit this tutorial");
                    }
                }
            });
        }
    };

    return main;
});