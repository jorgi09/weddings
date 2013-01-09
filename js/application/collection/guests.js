/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone.localStorage',
  'application/model/guest'
], function (Backbone, Guest) {
    console.log('File: collection/guests');
    var Guests = Backbone.Collection.extend({
        model: Guest,
        localStorage: new Backbone.LocalStorage('guests'),
        initialize: function () {
            console.log('collection', 'Guests:initialize', arguments);
        },
        confirmed: function () {
            console.log('collection', 'Guests:confirmed', arguments);
            return this.filter(function(model){
                return model.get('confirmed');
            });
        },
        alone: function () {
            console.log('collection', 'Guests:alone', arguments);
            return this.filter(function (model) {
                return !model.get('accompanying');
            });
        },
        accompanying: function () {
            console.log('collection', 'Guests:accompanying', arguments);
            return this.filter(function (model) {
                return model.get('accompanying');
            });
        },
        childs: function () {
            console.log('collection', 'Guests:childs', arguments);
            return this.filter(function (model) {
                return model.get('childrens');
            });
        },
        confirmedAccompanying: function () {
            console.log('collection', 'Guests:confirmedAccompanying', arguments);
            return this.filter(function(model){
                return (model.get('accompanying') && model.get('confirmed'))
            });
        },
        confirmedAlone: function () {
            console.log('collection', 'Guests:confirmedAlone', arguments);
            return this.filter(function(model){
                return (!model.get('accompanying') && model.get('confirmed'))
            });
        }
    });
    
    return Guests;
});
