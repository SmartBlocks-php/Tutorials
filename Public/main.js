define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var main = {
        init: function () {
            var editor = SmartBlocks.Blocks.Markdown.Main.showEditor();
            editor.addAction("Save", function () {
                console.log(editor.getHtml());
                editor.hide();
            });
        }
    };

    return main;
});