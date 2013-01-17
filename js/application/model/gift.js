/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone'
], function (Backbone) {
    console.log('File: model/gift');
    var Gift = Backbone.Model.extend({
        defaults: {
            'accepted': false,
            'image-small': false,
            'image-big': false
        },
        initialize: function () {
            console.log('model', 'Gift:initialize', arguments);
        },
        validate: function (attributes) {
            console.log('model', 'Gift:validate',attributes);
            if(!attributes.name || !_.isString(attributes.name) || _.isEmpty(attributes.name)) {
                return "Wrong name";
            }
        }
    });
    
    return Gift;
});
