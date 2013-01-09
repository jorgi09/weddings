/**
 * @file Main File for application
 * @author Michał Kamil Przybysz
 */

require.config({
    paths: {
        jquery: 'vendor/jquery',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        handlebars: 'vendor/handlebars',
        bootstrap: 'vendor/bootstrap.min',
        'backbone.localStorage': 'vendor/backbone.localStorage'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars:{
            exports: 'Handlebars'
        },
        bootstrap: {
            deps: ['jquery']
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});

require([
    'app'
], function (app) {
    app.initialize();
});



















