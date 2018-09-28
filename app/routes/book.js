import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
    model(params) {
        return RSVP.hash({
            authors: this.store.findAll('author'),
            publishers: this.store.findAll('publisher'),
            book: this.store.findRecord('book', params.book_id)
          });
    },
    setupController(controller,model){
        controller.set('authors',model.authors);
        controller.set('publishers',model.publishers);
        controller.set('book',model.book);
    }
});
