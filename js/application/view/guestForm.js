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
            if (this.input['accompanying']) {
                data.accompanying = this.input['accompanying'];
            }
            
            if (this.input['guest-first'] || this.input['guest-second']) {
                data['guest-first'] = this.input['guest-first'] || '';
                data['guest-second'] = this.input['guest-second'] || '';
            }
            
            if (this.input['accompanying-first'] || this.input['accompanying-second']) {
                data.accompanying = true;
                data['accompanying-first'] = this.input['accompanying-first'] || '';
                data['accompanying-second'] = this.input['accompanying-second'] || '';
            }
            
            if (this.input['childs'] && parseInt(this.input['childs'], 10) !== 0) {
                data.childrens = parseInt(this.input['childs'], 10)
            }
            
            return data;
        },
        checkbox: function (e) {
            var $el = $(e.target);
            this.input[$el.attr('name')] = $el.is(":checked");
        }
    });
    
    return GuestFrom;
});
