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
            'blur input[type="number"]': 'update'
        },
        initialize: function () {
            console.log('view', 'GuestFrom:initialize', arguments);
            this.events = _.extend({},Modal.prototype.events,this.events)
            this.$el.html(this.template({title: 'New Guest'}));
            this.input = {};
        },
        save: function (e) {
            console.log('view', 'GuestFrom:save', arguments);
            this.trigger('modal:save', this.inputs());
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
        inputs: function () {
            console.log('view', 'GuestFrom:inputs', arguments);
            var data = {};
            if (this.input['guest-name-first'] || this.input['guest-name-second']) {
                data.name = {};
                data.name.first = this.input['guest-name-first'] || '';
                data.name.second = this.input['guest-name-second'] || '';
            }
            
            if (this.input['accompanying-name-first'] || this.input['accompanying-name-second']) {
                data.accompanying = {};
                data.accompanying.first = this.input['accompanying-name-first'] || '';
                data.accompanying.second = this.input['accompanying-name-second'] || '';
            }
            if (this.input['childs'] && parseInt(this.input['childs'], 10) !== 0) {
                data.childrens = parseInt(this.input['childs'], 10)
            }
            return data;
        }
    });
    
    return GuestFrom;
});
