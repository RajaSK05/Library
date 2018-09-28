import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
export default Component.extend({
    addAuthorButton: htmlSafe("<button class=\"add-link\" onclick=\"document.getElementById(\'id02\').style.display=\'block\';document.getElementById(\'id01\').style.display=\'none\'\">+ Add Author</button>"),
    addPublisherButton: htmlSafe("<button class=\"add-link\" onclick=\"document.getElementById(\'id03\').style.display=\'block\';document.getElementById(\'id01\').style.display=\'none\'\">+ Add Publisher</button>"),
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
            console.log(this.get('author'));
            this.set('newBook.author', author);
            let publisher=this.get('publishers').filterBy('id', this.get('book.publisher.id')).get('firstObject');
            this.set('newBook.publisher', publisher);
            this.set('newBook.title', this.get('book.title'));
            this.set('newBook.categories', this.get('book.categories'));
            this.set('newBook.year', this.get('book.year'));
            console.log("newBook...", this.newBook);
        }
    },
    didRender() {

    },
    actions: {
        addBook() {
            this.get('addBook')(this.newBook);
        },
        editBook() {
            this.get('editBook')(this.newBook);
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
