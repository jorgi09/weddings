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
        inputs: {
            guest : {
                first: 'guest-name-first',
                second: 'guest-name-second'
            },
            accompanying: {
                first: 'accompanying-name-first',
                second: 'accompanying-name-second'
            }
        },
        events: {
            'dblclick': 'edit',
            'click .dropdown-menu li': 'confirmation',
            'click .delete': 'deleteItem'
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
            if(!this.isConfirmed()) {
                this.$el.toggleClass(this.editClass, this.isEdit);
                if(!this.isEdit()) {
                    this.save();
                }
            }
        },
        isConfirmed: function () {
            console.log('view', 'Guest:isConfirmed', arguments);
            return this.model.get('response');
        },
        isEdit: function () {
            console.log('view', 'Guest:isEdit', arguments);
            return this.$el.hasClass(this.editClass);
        },
        save: function () {
            console.log('view', 'Guest:save', arguments);
            this.model.save(this.getInputs());
        },
        getInputs: function () {
            console.log('view', 'Guest:getInputs', arguments);
            var inputs = this.$el.find('input'),
                guestFirst = inputs.filter('[name=' + this.inputs.guest.first + ']').val().trim(),
                guestSecond = inputs.filter('[name=' + this.inputs.guest.second + ']').val().trim(),
                accompanyingFirst = inputs.filter('[name=' + this.inputs.accompanying.first + ']').val().trim(),
                accompanyingSecond = inputs.filter('[name=' + this.inputs.accompanying.second + ']').val().trim(),
                chenges = {};
            
            if (guestFirst && guestSecond) {
                chenges.name = {
                    first: guestFirst,
                    second: guestSecond
                };
            }
            if (accompanyingFirst && accompanyingSecond) {
                chenges.accompanying = {
                    first: accompanyingFirst,
                    second: accompanyingSecond
                };
            }
            return chenges;
        },
        confirmation: function (e) {
            console.log('view', 'Guest:confirmation', arguments);
            var value = $(e.target).text();
            if (value.toLowerCase() === 'yes') {
                this.model.save({
                    confirmed: true,
                    response: true
                });
            } else {
                this.model.save({
                    confirmed: false,
                    response: true
                });
            }
        },
        deleteItem: function () {
            console.log('view', 'Guest:deleteItem', arguments);
            var question = new Modal({title: 'Warning', body: 'Are you sure you want to delete?'});
            question.render();
            question.once('modal:yes', this.clear, this);
        },
        clear: function () { 
            console.log('view', 'Guest:clear', arguments);
            this.model.destroy();
        }
    });
    
    return Guest;
});
