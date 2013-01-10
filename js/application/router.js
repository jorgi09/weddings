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
            this.menu = new Menu();
            this.menu.render();
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
            console.log(' ==========----------============\n <<<<<<<<< DASHBOARD >>>>>>>>>\n ==========----------============');
            this.$content.empty();
        },
        showGuestList: function () {
            console.log(' ==========----------============\n <<<<<<<<< GUEST LIST >>>>>>>>>\n ==========----------============');
            this.menu.changeActive('guest-list');
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
