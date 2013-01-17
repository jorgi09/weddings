/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'handlebars',
  'application/view/modal',
  'text!templates/gifts/gift.html'
], function (Backbone, Handlebars, Modal, template) {
    console.log('File: view/gift');
    var Gift = Backbone.View.extend({
        tagName: 'li',
        className: 'media',
        template: Handlebars.compile(template),
        events: {
            'click .button-delete-item': 'deleteItem'
        },
        initialize: function () {
            console.log('view', 'Gift:initialize', arguments);
            this.model.on('destroy',this.remove, this);
            this.model.on('change',this.render, this);
            return this;
        },
        render: function () {
            console.log('view', 'Gift:render', arguments);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        deleteItem: function () {
            console.log('view', 'Gift:deleteItem', arguments);
            var question = new Modal({title: 'Warning', body: 'Are you sure you want to delete?'});
            question.render();
            question.once('modal:yes', this.destroy, this);
            return this;
        },
        destroy: function () { 
            console.log('view', 'Gift:destroy', arguments);
            this.model.destroy();
            return this;
        }
    });
    
    return Gift;
});
