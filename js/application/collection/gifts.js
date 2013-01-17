/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone.localStorage',
  'application/model/gift'
], function (Backbone, Gift) {
    console.log('File: collection/gifts');
    var Gifts = Backbone.Collection.extend({
        model: Gift,
        localStorage: new Backbone.LocalStorage('gifts'),
        initialize: function () {
            console.log('collection', 'Gifts:initialize', arguments);
        }
    });
    
    return Gifts;
});
