import DS from 'ember-data';

export default DS.Model.extend({
    name:DS.attr('String'),
    phone:DS.attr('String'),
    address:DS.attr('String'),
    books:DS.hasMany('book')
});
