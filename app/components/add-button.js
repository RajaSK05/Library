import Component from '@ember/component';

export default Component.extend({
    actions:{
        toggleAuthorModalDialog(){
            this.get('toggleAuthorModalDialog')();
        },
        togglePublisherModalDialog(){
            this.get('togglePublisherModalDialog')();
        }
    }
});
