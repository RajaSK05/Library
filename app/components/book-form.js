import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
export default Component.extend({
    newBook: {
        title: null,
        author: null,
        publisher: null,
        categories: null,
        year: null
    },
    booksController: null,
    init() {
        this._super(...arguments);
        this.set('categories', ['Adventures', 'Comics', 'Computer Science', 'Mechanical', 'Medical', 'fiction']);
        if (this.get('book')) {
            let author=this.get('authors').filterBy('id', this.get('book.author.id')).get('firstObject');
            this.set('newBook.author', author);
            let publisher=this.get('publishers').filterBy('id', this.get('book.publisher.id')).get('firstObject');
            this.set('newBook.publisher', publisher);
            this.set('newBook.title', this.get('book.title'));
            this.set('newBook.categories', this.get('book.categories'));
            this.set('newBook.year', this.get('book.year'));
        }
    },
    actions: {
        addBook() {
            this.get('addBook')(this.newBook);
        },
        editBook() {
            this.get('editBook')(this.newBook);
        },
        toggleBookModalDialog(){
            this.get('toggleBookModalDialog')();
        },
        toggleAuthorModalDialog(){
            this.get('toggleBookModalDialog')();
            this.get('toggleAuthorModalDialog')();
        },
        togglePublisherModalDialog(){
            this.get('toggleBookModalDialog')();
            this.get('togglePublisherModalDialog')();
        }
    },
    willDestroyElement() {
        this.set('newBook.title', null);
        this.set('newBook.author', null);
        this.set('newBook.categories', null);
        this.set('newBook.publisher', null);
        this.set('newBook.year', null);
    }
});
