/**
 * @file Button class
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'application/view/button'
], function (Backbone, Button) {
    console.log('File: view/menu');
    var Buttons = Backbone.View.extend({
        className: 'btn-toolbar',
        initialize: function (data, parent) {
            console.log('view', 'Buttons:initialize', arguments);
            var self = this;
            this.parent = parent || self;
            this.$container = $('<div/>').addClass('btn-group').appendTo(this.$el);
            this.size = data.size || '';
            this.addAll(data.buttons);
        },
        render: function () {
            console.log('view', 'Buttons:render', arguments);
            return this.el;
        },
        addAll: function (list) {
            this.$container.empty();
            var self = this;
            _.each(list,this.addOne, this);
        },
        addOne: function (buttonObject, i ) {
            _.extend(buttonObject, {size: this.size});
            var button = new Button(buttonObject, this.parent);
            this.$container.append(button.render());
        }
    });
    
    return Buttons;
});
