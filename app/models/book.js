import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('String'),
    categories: DS.attr('array'),
    year: DS.attr(),
    author: DS.belongsTo('author'),
    publisher: DS.belongsTo('publisher')
});
