/**
 * @file Gift list main view
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'handlebars',
  'application/view/gift',
  'application/view/giftForm',
  'text!templates/gifts/gifts.html',
  'bootstrap'
], function (Backbone, Handlebars, Gift, GiftForm, template) {
    console.log('File: view/gifts');
    var Gifts = Backbone.View.extend({
            childrens: [],
            template: Handlebars.compile(template),
            events: {
                'click .button-add-new': 'addNew'
            },
            initialize: function () {
                console.log('view', 'Gifts:initialize', arguments);
                this.$el.html(this.template());
                this.$list = this.$el.find('.media-list');
                this.collection.on('add', this.addOne, this);
                this.collection.on('reset', this.addAll, this);
                this.collection.on('all', this.render, this);
            },
            render: function () {
                console.log('view', 'Gifts:render', arguments);
            },
            addAll: function () {
                console.log('view', 'Gifts:addAll', arguments);
                this.$list.empty();
                this.collection.each(this.addOne, this);
            },
            addOne: function (model) {
                console.log('view', 'Gifts:addOne', arguments);
                var one = new Gift({model: model});
                this.$list.append(one.render().el);
            },
            addNew: function () {
                console.log('view', 'Gifts:addNew', arguments);
                var form = new GiftForm({title: 'New Gift'});
                form.once('modal:save', function (data) {
                    this.collection.create(data);
                }, this);
            }
        });
    return Gifts;
});

