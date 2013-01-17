/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'handlebars',
  'application/view/modal',
  'text!templates/gifts/giftForm.html'
], function (Backbone, Handlebars, Modal, template) {
    console.log('File: view/giftFrom');
    var GiftFrom = Modal.extend({
        template: Handlebars.compile(template),
        events: {
            'blur input[type="text"]': 'update'
        },
        initialize: function () {
            console.log('view', 'GiftFrom:initialize', arguments);
            this.events = _.extend({},Modal.prototype.events,this.events)
            this.$el.html(this.template({title: 'New Gift'}));
            this.input = {};
            return this;
        },
        save: function (e) {
            console.log('view', 'GiftFrom:save', arguments);
            this.trigger('modal:save', this.inputs());
            this.remove(e);
            return this;
        },
        update: function (e) {
            console.log('view', 'GiftFrom:update', arguments);
            var $el = $(e.target),
                value = $el.val();
            if (value !== '') {
                this.input[$el.attr('name')] = value;
            }
            return this;
        },
        inputs: function () {
            console.log('view', 'GiftFrom:inputs', arguments);
            var data = {};
            if (this.input['name']) {
                data['name'] = this.input['name'] || '';
            }
            
            return data;
        }
    });
    return GiftFrom;
});
