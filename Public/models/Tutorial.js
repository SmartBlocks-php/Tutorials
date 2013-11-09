define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Model = Backbone.Model.extend({
        default: {

        },
        urlRoot: "/Tutorials/Tutorials",
        init: function () {

        },
        getCreated: function () {
            var base = this

            if (base.get('created')) {
                var date = new Date(base.get('created').date);
                return date;
            } else {
                return new Date();
            }
        },
        getLastUpdate: function () {
            var base = this
            if (base.get('last_update')) {
                var date = new Date(base.get('last_update').date);
                return date;
            } else {
                return new Date();
            }
        },
        getCreator: function () {
            var base = this;
            var user_id = base.get('creator') ? base.get('creator').id : 0;
            return SmartBlocks.Blocks.Kernel.Data.users.get(user_id);
        },
        getCategory: function () {
            var base = this;
            var category_id = base.get("category") ? base.get('category').id : 0;
            return SmartBlocks.Blocks.Tutorials.Data.categories.get(category_id);
        }
    });
    return Model;
});