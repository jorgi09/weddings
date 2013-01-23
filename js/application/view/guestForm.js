/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'handlebars',
  'application/view/modal',
  'text!templates/guests/guestForm.html'
], function (Backbone, Handlebars, Modal, template) {
    console.log('File: view/guestFrom');
    var GuestFrom = Modal.extend({
        template: Handlebars.compile(template),
        events: {
            'blur input[type="text"]': 'update',
            'blur input[type="number"]': 'update',
            'change input[type="checkbox"]': 'checkbox'
        },
        initialize: function () {
            console.log('view', 'GuestFrom:initialize', arguments);
            this.events = _.extend({},Modal.prototype.events,this.events);
            this.constructor.__super__.initialize.apply(this, arguments);
            this.input = {};
        },
        save: function (e) {
            console.log('view', 'GuestFrom:save', arguments);
            this.trigger('modal:save', this.input);
            this.remove(e);
        },
        update: function (e) {
            console.log('view', 'GuestFrom:update', arguments);
            var $el = $(e.target),
                value = $el.val();
            if (value !== '') {
                this.input[$el.attr('name')] = value;
            }
        },
        checkbox: function (e) {
            var $el = $(e.target);
            this.input[$el.attr('name')] = $el.is(":checked");
        }
    });
    
    return GuestFrom;
});
