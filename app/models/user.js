import DS from 'ember-data';

export default DS.Model.extend({
    uname:DS.attr('String'),
    password:DS.attr('String'),
    type:DS.attr('String'),
    
});
