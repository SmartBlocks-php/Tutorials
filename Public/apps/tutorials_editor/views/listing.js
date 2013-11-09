define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/listing.html',
    '../../tutorials/views/line_thumb'
], function ($, _, Backbone, listing_tpl, LineThumb) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "listing",
        initialize: function () {
            var base = this;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(listing_tpl, {});
            base.$el.html(template);
            base.renderTutorialList();
        },
        renderTutorialList: function () {
            var base = this;

            var editable = SmartBlocks.Blocks.Tutorials.Data.tutorials.filter(function (tutorial) {
                return tutorial.getCreator().get('id') == SmartBlocks.current_user.get('id');
            });

            base.$el.find(".tutorials_edition_lister").html('');
            for (var k in editable) {
                var tutorial = editable[k];
                (function (tutorial) {
                    var line_thumb = new LineThumb({ model: tutorial });
                    base.$el.find(".tutorials_edition_lister").append(line_thumb.$el);
                    line_thumb.init();
                    line_thumb.onClick(function () {
                        window.location = "#TutorialsEditor/edit/" + tutorial.get('id');
                    }, 'Edit this tutorial');
                })(tutorial);

            }
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});