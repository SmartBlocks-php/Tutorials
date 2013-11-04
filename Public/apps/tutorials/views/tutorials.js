define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tutorials.html',
    './tutorials_home'
], function ($, _, Backbone, tutorials_tpl, TutorialsHomeView) {
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

            var tutorials_home = new TutorialsHomeView();
            base.$el.find(".tutorials_content").html(tutorials_home.$el);
            tutorials_home.init();
        },
        registerEvents: function () {
            var base = this;

//            base.$el.delegate('.createtuto', 'click', function () {
//                var tutorial = new base.block.Models.Tutorial({
//                    title: "New tuto",
//                    content: "My tutorial \n ============ \n **super**"
//                });
//                console.log("trying to save tutorial");
//                tutorial.save({}, {
//                    success: function () {
//                        console.log("saved tutorial");
//                        console.log(tutorial);
//                    }
//                });
//                base.block.Data.tutorials.add(tutorial);
//                console.log(base.block.Data.tutorials);
//            });
        }
    });

    return View;
});