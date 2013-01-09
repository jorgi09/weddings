/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone'
], function (Backbone) {
    console.log('File: model/guest');
    var Guest = Backbone.Model.extend({
        defaults: {
            name: {
                first: 'First name',
                second: 'Second name'
            },
            accompanying: false,
            childerns: false,
            confirmed: false,
            response: false
        },
        initialize: function () {
            console.log('model', 'Guest:initialize', arguments);
        },
        validate: function (attributes) {
            console.log('model', 'Guest:validate',attributes);
            if(attributes.name) {
                
            }
            if(attributes.name) {
                
            }
        }
    });
    
    return Guest;
});



















