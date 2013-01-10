/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'jquery',
  'backbone',
  'application/view/menu',
  'application/view/guests'
], function ($, Backbone, Menu, Guests) {
    var Router = Backbone.Router.extend({
        initialize: function () {
            this.$content = $('#contents');
            (new Menu()).render();
        },
        routes: {
            '': 'dashboard',
            'guest-list': 'showGuestList',
            'gift-list': 'showGiftList',
            'todo-list': 'showToDo',
            'galleries': 'showGalleries',
            '*action': 'showError'
        },
        dashboard: function () {
            //alert('dashboard');
            this.$content.empty();
        },
        showGuestList: function () {
            //alert('guest-list');
            this.$content.empty();
            (new Guests).render();
        },
        showGiftList: function () {
            //alert('gift-list')
        },
        showToDo: function () {
            //alert('todo-list')
        },
        showGalleries: function () {
            //alert('galleries')
        },
        showError: function () {
            //alert('Error 404')
        }
    });
    
    var initialize = function () {
        var router = new Router();
        Backbone.history.start();
    };
    return {
        initialize: initialize
    }
});
