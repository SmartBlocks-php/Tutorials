define([
    'jquery',
    'underscore',
    'backbone',
    '../models/Category'
], function ($, _, Backbone, Category) {
    var Collection = Backbone.Collection.extend({
        model: Category,
        url: "/Tutorials/Categories"
    });

    return Collection;
});