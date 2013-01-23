/**
 * @file Button class
 * @author Michał Kamil Przybysz
 */

define([
  'backbone'
], function (Backbone) {
    console.log('File: view/menu');
    var Button = Backbone.View.extend({
        tagName: 'a',
        className: 'btn',
        TYPES: ['info', 'primary', 'success', 'warning', 'danger', 'inverse', 'link'],
        SIZES: ['large', 'small', 'mini'],
        DEFAULTS: {
            text: false,
            icon: false,
            size: false,
            type: false,
            attr: false,
            callback: false,
            activeState: false
        },
        events: {
            'click': 'active'
        },
        initialize: function (data, object) {
            console.log('view', 'Button:initialize', arguments);
            var self = this;
            _.defaults(data, this.DEFAULTS);
            if ((!data.text || !data.icon )&& !data.callback) {
                return false;
            }
            this.parent = object || self;
            this.callback =  data.callback;
            data.size ? this.setSize(data.size) : false;
            data.type ? this.setType(data.type) : false;
            this.on('change:icon', this.createIcon, this);
            this.on('change:text', this.createText, this);
            this.setIcon(data.icon);
            this.setText(data.text);
        },
        render: function () {
            console.log('view', 'Button:render', arguments);
            return this.el;
        },
        active: function (e) {
            e.preventDefault();
            this.trigger('button:active');
            this.callback.apply(this.parent);
        },
        addClass: function (className) {
            this.$el.addClass(className);
            return this;
        },
        removeClass: function (className) {
            this.$el.removeClass(className);
            return this;
        },
        setSize: function (size) {
            this.setAdditionalClass(this.SIZES, size);
        },
        setType: function (type) {
            this.setAdditionalClass(this.TYPES, type);
        },
        setAdditionalClass: function (list, value) {
            if (_.contains(list, value)) {
                this.removeClass(list);
                this.addClass(this.className+'-'+value);
            }
            return this;
        },
        removeAdditionClass: function (list) {
            var self = this;
            list.each(function (i, item) {
                self.remove( self.className+'-'+item);
            });
        },
        setText: function (text) {
            if (text && text !== '' && _.isString(text)) {
                this.text = text;
                this.trigger('change');
                this.trigger('change:text');
            }
        },
        setIcon: function (icon) {
            if (icon && icon !== '' && _.isString(icon)) {
                this.icon = icon;
                this.trigger('change');
                this.trigger('change:icon');
            }
        },
        createIcon: function () {
            if (!this.iconElement) {
                this.iconElement = $('<span/>');
                this.$el.append(this.iconElement);
            }
            this.iconElement.addClass(this.icon);
        },
        createText: function () {
            if (!this.textElement) {
                this.textElement = $('<span/>');
                this.$el.append(this.textElement);
            }
            this.textElement.text(this.text);
        }
    });
    
    return Button;
});
