import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';

export default Controller.extend({
    isAdded: false,
    authorModalDialog: false,
    init(){
        this._super(...arguments);
        this.set('isAdded',true);
    },
    storage:Ember.inject.service(),
    authors: computed('isAdded', function () {
        this.store.findAll('author').then((result) => {
            Ember.set(this, 'isAdded', true);
            return result.content
        }).catch((err) => {
            console.log('error on updating authors');
        })
    }),
    searchedAuthors: null,
    actions: {
        handleFilterEntry() {
            let filterInputValue = this.value.toLowerCase();
            if (filterInputValue) {
                let results = this.authors.filter((author, index, self) => {
                    console.log("++++", author);
                    return Ember.get(author, '__data.name').toLowerCase().includes(filterInputValue);
                });
                console.log(results);
                if (results.get('length') === 0) {
                    Ember.set(this, 'searchedAuthors', 'none');
                } else {
                    Ember.set(this, 'searchedAuthors', results);
                }
            }
            else {
                Ember.set(this, 'searchedAuthors', null);
            }
        },
        toggleAuthorModalDialog(){
            this.toggleProperty('authorModalDialog');
            this.toggleProperty('isAdded');
        },
        
        addAuthor(newAuthor) {
            this.store.createRecord('author', {
                "name": newAuthor.name,
                "country": newAuthor.country
            }).save().then((rec) => {
                this.send('toggleAuthorModalDialog');
            });
        }
    }
});
