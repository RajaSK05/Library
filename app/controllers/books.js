import Controller from '@ember/controller';
import { get, set, computed } from '@ember/object';
export default Controller.extend({
    init() {
        this._super(...arguments);
        set(this, 'isAdded', true);
        set(this, 'selectedCategory', 'All');
        
    },
    selectedCategory: "All",
    categories: ['All','Adventures', 'Comics', 'Computer Science', 'Mechanical', 'Medical', 'fiction'],
    bookModalDialog:false,
    authorModalDialog:false,
    publisherModalDialog:false,
    isAdded:false,
    storage:Ember.inject.service(),
    searchedBooks: null,
    filteredBooks: computed('selectedCategory', 'books', function () {
        if (this.selectedCategory === "All") {
            return this.books;
        }
        return Ember.get(this, 'books').filter((book, index, self) => {
            return Ember.get(book, '__data.categories').includes(this.selectedCategory);
        });
    }),
    publishers:computed('bookModalDialog','publisherModalDialog', function(){
        return this.store.findAll('publisher').then((result) => {
            return result.content.sortBy('__data.name');
        })
    }),
    books: computed('isAdded','bookModalDialog', function () {
        this.store.findAll('book').then((result) => {
            return result.content;
        })
    }),
    authors: computed('bookModalDialog','authorModalDialog', function () {
        return this.store.findAll('author').then((result) => {
            return result.content.sortBy('__data.name');
        })
    }),

    actions: {
        filterBooks(books) {
            return books.filterBy("categories", get('selectedCcategory'));
        },
        handleFilterEntry() {
            let filterInputValue = this.value.toLowerCase();
            if (filterInputValue) {
                let results = this.filteredBooks.filter((book, index, self) => {
                    return Ember.get(book, '__data.title').toLowerCase().includes(filterInputValue);
                });
                if (results.get('length') === 0) {
                    set(this, 'searchedBooks', 'none');
                } else {
                    set(this, 'searchedBooks', results);
                }
            }
            else {
                set(this, 'searchedBooks', null);
            }
        },
        
        toggleBookModalDialog(){
            this.toggleProperty('bookModalDialog');
        },
        toggleAuthorModalDialog(){
            this.toggleProperty('authorModalDialog');
        },
        togglePublisherModalDialog(){
            this.toggleProperty('publisherModalDialog');
        },
        openAuthorModal(){
            this.set('bookModalDialog', false);
            this.send('toggleAuthorModalDialog');
        },
        closeAuthorModal(){
            this.set('bookModalDialog', true);
            this.send('toggleAuthorModalDialog');
        },
        openPublisherModal(){
            this.set('bookModalDialog', false);
            this.send('togglePublisherModalDialog');
        },
        closePublisherModal(){
            this.set('bookModalDialog', true);
            this.send('togglePublisherModalDialog');
        },
        addBook(newBook) {
            this.set('isAdded',false);
            let author = this.store.peekRecord('author',newBook.author.id);
            let publisher = this.store.peekRecord('publisher',newBook.publisher.id);
            var _this=this;
            this.store.createRecord('book', {
                "title": newBook.title,
                'categories': newBook.categories,
                "year": newBook.year,
                "author": author,
                "publisher":publisher
            }).save().then((rec)=>{
                author.save();
                publisher.save();
                set(_this,'isAdded',true);
                
            })
            this.send('toggleBookModalDialog');
        },
        addAuthor(newAuthor) {
            this.store.createRecord('author', {
                "name": newAuthor.name,
                "country": newAuthor.country,
            }).save()
        },
        addPublisher(newPublisher) {
            this.store.createRecord('publisher', {
                "name": newPublisher.name,
                "address": newPublisher.address,
                "phone":newPublisher.phone
            }).save()
        }
    }
});