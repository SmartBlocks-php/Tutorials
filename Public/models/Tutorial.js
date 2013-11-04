define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Model = Backbone.Model.extend({
        default: {

        },
        urlRoot: "/Tutorials/Tutorials",
        getCreated: function () {
            var base = this
            var date = new Date(base.get('created').date);
            return date;
        },
        getLastUpdate: function () {
            var base = this
            var date = new Date(base.get('last_update').date);
            return date;
        },
        getCreator: function () {
            var base = this;
            var user_id = base.get('creator') ? base.get('creator').id : 0;
            return SmartBlocks.Blocks.Kernel.Data.users.get(user_id);
        }
    });
    return Model;
});