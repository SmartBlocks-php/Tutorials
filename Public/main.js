define([
    'jquery',
    'underscore',
    'backbone',
    './apps/tutorials/views/tutorials'
], function ($, _, Backbone, TutorialsView) {
    var main = {
        init: function () {
//            var editor = SmartBlocks.Blocks.Markdown.Main.showEditor();
//            editor.addAction("Save", function () {
//                console.log(editor.getHtml());
//                editor.hide();
//            });


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
                }
            });
        }
    };

    return main;
});