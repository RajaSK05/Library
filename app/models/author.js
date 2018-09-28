import DS from 'ember-data';

export default DS.Model.extend({
    name:DS.attr('String'),
    country:DS.attr('String'),
    books:DS.hasMany('book')
});
