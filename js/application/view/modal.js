/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'handlebars',
  'text!templates/modal.html'
], function (Backbone, Handlebars, template) {
    console.log('File: view/modal');
    var Modal = Backbone.View.extend({
        className: 'overlay',
        template: Handlebars.compile(template),
        events: {
            'click .modal-close': 'close',
            'click .modal-save': 'save',
            'click .modal-ok': 'ok',
            'click .modal-cencel': 'cencel',
            'click .modal-yes': 'yes',
            'click .modal-no': 'no'
        },
        initialize: function (data) {
            console.log('view', 'Modal:initialize', arguments);
            this.$el.html(this.template(data || null));
        },
        render: function () {
            console.log('view', 'Modal:render', arguments);
            $('body').append(this.$el);
        },
        remove: function (e) {
            console.log('view', 'Modal:remove', arguments);
            e.preventDefault();
            this.$el.remove();
        },
        close: function (e) {
            console.log('view', 'Modal:close', arguments);
            this.trigger('modal:close');
            this.remove(e);
        },
        save: function (e) {
            console.log('view', 'Modal:save', arguments);
            this.trigger('modal:save');
            this.remove(e);
        },
        ok: function (e) {
            console.log('view', 'Modal:ok', arguments);
            this.trigger('modal:ok');
            this.remove(e);
        },
        cencel: function (e) {
            console.log('view', 'Modal:cencel', arguments);
            this.trigger('modal:cencel');
            this.remove(e);
        },
        yes: function (e) {
            console.log('view', 'Modal:yes', arguments);
            this.trigger('modal:yes');
            this.remove(e);
        },
        no: function (e) {
            console.log('view', 'Modal:no', arguments);
            this.trigger('modal:no');
            this.remove(e);
        }
    });
    
    return Modal;
});
