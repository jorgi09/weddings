/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'jquery',
  'backbone',
  'application/view/menu',
  'application/view/guests',
  'application/collection/guests',
  'application/view/gifts',
  'application/collection/gifts'
], function ($, Backbone, Menu, Guests, GuestsCollection, Gifts, GiftsCollection) {
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
            var collection = new GuestsCollection(),
                view = new Guests({collection: collection});
            this.$content.html(view.el);
            collection.fetch();
            this.menu.changeActive('guest-list');
        },
        showGiftList: function () {
            console.log(' ==========----------============\n <<<<<<<<< GIFT LIST >>>>>>>>>\n ==========----------============');
            var collection = new GiftsCollection(),
                view = new Gifts({collection: collection});
            this.$content.html(view.el);
            collection.fetch();
            this.menu.changeActive('gift-list');
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
