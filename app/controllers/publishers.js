import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';

export default Controller.extend({
    isAdded: true,
    storage:Ember.inject.service(),
    publishers: computed('isAdded', function () {
        console.log("publishers-computed");
        this.store.findAll('publisher').then((result) => {
            Ember.set(this, 'publishers', result.content);
            console.log("publishers-then", Ember.get(this, 'publishers'));
        }).catch((err) => {
            console.log('error on updating publishers');
        })
    }),
    searchedPublishers: null,
    actions: {
        handleFilterEntry() {
            let filterInputValue = this.value.toLowerCase();
            if (filterInputValue) {
                let results = this.publishers.filter((publisher, index, self) => {
                    console.log("++++", publisher);
                    return Ember.get(publisher, '__data.name').toLowerCase().includes(filterInputValue);
                });
                console.log(results);
                if (results.get('length') === 0) {
                    Ember.set(this, 'searchedPublishers', 'none');
                } else {
                    Ember.set(this, 'searchedPublishers', results);
                }
            }
            else {
                Ember.set(this, 'searchedPublishers', null);
            }
        },
        togglePublisherModalDialog(){
            this.toggleProperty('publisherModalDialog');
            // this.toggleProperty('isAdded');
        },
        
        addPublisher(newPublisher) {
            this.store.createRecord('publisher', {
                "name": newPublisher.name,
                "address": newPublisher.address,
                "phone":newPublisher.phone
            }).save().then((rec) => {
                this.send('togglePublisherModalDialog');

            });
        }
    }
});
