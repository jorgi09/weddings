/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'handlebars',
  'text!templates/menu.html'
], function (Backbone, Handlebars, template) {
    console.log('File: view/menu');
    var Menu = Backbone.View.extend({
        el: '#menu',
        template: Handlebars.compile(template),
        events: {
            'click .nav-list': 'active'
        },
        initialize: function () {
            console.log('view', 'Menu:initialize', arguments);
            this.$el.append(this.template());
            
        },
        render: function () {
            console.log('view', 'Menu:render', arguments);
            return this;
        },
        active: function (e) {
            console.log('view', 'Menu:active', arguments);
            this.$el.find('.active').removeClass('active');
            $(e.target).parent().addClass('active');
        },
        changeActive: function (url) {
            this.$el.find('.active').removeClass('active');
            this.$el.find('[href="#/' + url + '"]').parent().addClass('active')
        }
    });
    
    return Menu;
});
