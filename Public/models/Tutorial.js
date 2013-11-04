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
        }
    });
    return Model;
});