import Component from '@ember/component';

export default Component.extend({
    newPublisher: {
        name: null,
        address:null,
        phone: null
    },
    actions: {
        addPublisher() {
            this.get('addPublisher')(this.newPublisher);
            this.send('closePublisherModal')
        },
        closePublisherModal() {
            this.get('closePublisherModal')();
        }

    }
});
