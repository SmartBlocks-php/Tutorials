define([
    'jquery',
    'underscore',
    'backbone',
    './apps/tutorials/views/tutorials'
], function ($, _, Backbone, TutorialsView) {
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
        }
    };

    return main;
});