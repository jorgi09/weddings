/**
 * @file Application start file
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'application/router'
], function (Backbone, Router) {
    var initialize = function () {
        Router.initialize();
    };
    
    return {
        initialize: initialize
    }
});



















