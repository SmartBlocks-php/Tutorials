define([
    'jquery',
    'underscore',
    'backbone',
    '../Models/Tutorial'
], function ($, _, Backbone, Tutorial) {
    var Collection = Backbone.Collection.extend({
        model: Tutorial,
        url: "/Tutorials/Tutorials"
    });

    return Collection;
});