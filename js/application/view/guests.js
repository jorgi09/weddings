/**
 * @file Routers for application
 * @author Michał Kamil Przybysz
 */

define([
  'backbone',
  'handlebars',
  'application/collection/guests',
  'application/view/guest',
  'application/view/guestForm',
  'text!templates/guests/guests.html',
  'text!templates/guests/informations.html',
  'bootstrap'
], function (Backbone, Handlebars, Collection, Model, GuestFrom, template, informations) {
    console.log('File: view/guests');
    var guests = new Collection(),
        Guests = Backbone.View.extend({
            el: '#contents',
            template: Handlebars.compile(template),
            tamplateInformation: Handlebars.compile(informations),
            events: {
                'click .button-add-new': 'addNew'
            },
            initialize: function () {
                console.log('view', 'Guests:initialize', arguments);
                this.$el.append(this.template());
                this.$statistics = this.$el.find('.statistics');
                this.$list = this.$el.find('.list');
                this.collection = guests;
                this.collection.on('add', this.addOne, this);
                this.collection.on('reset', this.addAll, this);
                this.collection.on('all', this.render, this);
                this.collection.fetch();
            },
            render: function () {
                console.log('view', 'Guests:render', arguments);
                this.$statistics.html(this.tamplateInformation(this.statistics()));
            },
            statistics: function () {
                var collectionChilds = this.collection.childs(),
                    collectionConfAcc = this.collection.confirmedAccompanying(),
                    collectionConfAlone = this.collection.confirmedAlone(),
                    collectionAlone = this.collection.alone(),
                    collectionAcc = this.collection.accompanying(),
                    overallChilds = 0,
                    confirmedChilds = 0,
                    filterChildrens = function(model){
                        return model.get('childrens');
                    },
                    collectionChildsWithAlone = collectionConfAlone.filter(filterChildrens),
                    collectionChildsWithAcc = collectionConfAcc.filter(filterChildrens),
                    addChildrens = function (item) {
                        confirmedChilds = confirmedChilds + item.get('childrens');
                    };
                
                collectionChilds.forEach(function(item){
                    overallChilds = overallChilds + item.get('childrens');
                });
                collectionChildsWithAlone.forEach(addChildrens);
                collectionChildsWithAcc.forEach(addChildrens);
                
                return {
                    confirmed: collectionConfAlone.length + (collectionConfAcc.length*2),
                    confirmedChilds: confirmedChilds,
                    alone: collectionAlone.length,
                    accompanying: collectionAcc.length,
                    overallChilds: overallChilds,
                    withChilds: collectionChilds.length,
                    overall: collectionAlone.length + (collectionAcc.length*2)
                };
            },
            addAll: function () {
                console.log('view', 'Guests:addAll', arguments);
                this.$list.empty();
                this.collection.each(this.addOne, this);
            },
            addOne: function (model) {
                console.log('view', 'Guests:addOne', arguments);
                var item = new Model({model: model});
                this.$list.append(item.render().el);
            },
            addNew: function () {
                console.log('view', 'Guests:addNew', arguments);
                var form = new GuestFrom();
                form.render();
                form.once('modal:save', function (data) {
                    this.collection.create(data);
                }, this);
            }
        });
    
    return Guests;
});

