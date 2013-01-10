/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'handlebars',
  'application/view/modal',
  'text!templates/guests/guest.html'
], function (Backbone, Handlebars, Modal, template) {
    console.log('File: view/guest');
    var Guest = Backbone.View.extend({
        tagName: 'tr',
        className: 'guest-item',
        template: Handlebars.compile(template),
        editClass: 'edited',
        events: {
            'click .button-edit': 'edit',
            'click .button-save': 'save',
            'click .button-delete-item': 'deleteItem',
            'blur input[type="text"]': 'update', 
            'click .dropdown-menu li': 'changeResponse',
            'change input[type="checkbox"]': 'accompanying'
        },
        initialize: function () {
            console.log('view', 'Guest:initialize', arguments);
            this.model.on('destroy',this.remove, this);
            this.model.on('change',this.render, this);
            return this;
        },
        render: function () {
            console.log('view', 'Guest:render', arguments);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        edit: function () {
            console.log('view', 'Guest:edit', arguments);
            this.$el.toggleClass(this.editClass);
        },
        isEdit: function () {
            console.log('view', 'Guest:isEdit', arguments);
            return this.$el.hasClass(this.editClass);
        },
        changeResponse: function (e) {
            console.log('view', 'Guest:response', arguments);
            var value = $(e.target).text(),
                response = {};
            if (value.toLowerCase() === 'yes') {
                response = {confirmed: true, response: true};
            } else {
                response = {confirmed: false, response: true};
            }
            this.model.save(response);
        },
        deleteItem: function () {
            console.log('view', 'Guest:deleteItem', arguments);
            var question = new Modal({title: 'Warning', body: 'Are you sure you want to delete?'});
            question.render();
            question.once('modal:yes', this.destroy, this);
        },
        destroy: function () { 
            console.log('view', 'Guest:destroy', arguments);
            this.model.destroy();
        },
        update: function (e) {
            console.log('view', 'Guest:update', arguments);
            var input = $(e.target),
                value = input.val(),
                name = input.attr('name');
            
            this.model.set(name, value, {silent: true});
        },
        save: function () {
            this.$el.toggleClass(this.editClass);
            this.model.save();
        },
        accompanying: function (e) {
            var checkbox = $(e.target);
            //console.log(checkbox.parents('.edit').remove());
            checkbox.parents('.edit').toggleClass('checkbox-hidden', checkbox.is(":checked"));
            this.model.set('accompanying', checkbox.is(":checked"), {silent: true});
        }
    });
    
    return Guest;
});
