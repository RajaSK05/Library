import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
export default Controller.extend({
    init() {
        this._super(...arguments);
        console.log("init");
        Ember.set(this, 'isAdded', true);
        Ember.set(this, 'selectedCategory', 'All');
        
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
        console.log("books-comp", Ember.get(this, 'books'));
        if (this.selectedCategory === "All") {
            return this.books;
        }
        return Ember.get(this, 'books').filter((book, index, self) => {
            return Ember.get(book, '__data.categories').includes(this.selectedCategory);
        });
    }),
    publishers:computed('isAdded', function(){
        return this.store.findAll('publisher').then((result) => {
            return result.content.sortBy('__data.name');
        }).catch((err) => {
            console.log('error on updating publishers');
        })
    }),
    books: computed('isAdded', function () {
        this.store.findAll('book').then((result) => {
            return result.content;
        }).catch((err) => {
            console.log('error on updating books');
        })
    }),
    authors: computed('isAdded', function () {
        console.log("authors -computed");
        return this.store.findAll('author').then((result) => {
            return result.content.sortBy('__data.name');
        }).catch((err) => {
            console.log('error on updating authors');
        })
    }),

    actions: {
        filterBooks(books) {
            console.log("1 ", this);
            console.log("2 ", books, this.get('selectedCategory'));
            console.log("4 ", books.filterBy("categories", this.get('selectedCategory')));
            return books.filterBy("categories", this.get('selectedCcategory'));
        },
        handleFilterEntry() {
            let filterInputValue = this.value.toLowerCase();
            if (filterInputValue) {
                let results = this.filteredBooks.filter((book, index, self) => {
                    console.log("++++", book);
                    return Ember.get(book, '__data.title').toLowerCase().includes(filterInputValue);
                });
                console.log(results);
                if (results.get('length') === 0) {
                    Ember.set(this, 'searchedBooks', 'none');
                } else {
                    Ember.set(this, 'searchedBooks', results);
                }
            }
            else {
                Ember.set(this, 'searchedBooks', null);
            }
        },
        
        toggleBookModalDialog(){
            this.toggleProperty('bookModalDialog');
            this.toggleProperty('isAdded');
        },
        toggleAuthorModalDialog(){
            this.toggleProperty('authorModalDialog');
            console.log("toggle author - ",this.get('authorModalDialog'));
        },
        togglePublisherModalDialog(){
            this.toggleProperty('publisherModalDialog');
        },
        addBook(newBook) {
            this.set('isAdded',false);
            console.log('new--- ',newBook);
            let author = this.store.peekRecord('author',newBook.author.id);
            console.log("author----- ",author);
            let publisher = this.store.peekRecord('publisher',newBook.publisher.id);
            console.log("publisher----- ",publisher);
            var _this=this;
            this.store.createRecord('book', {
                "title": newBook.title,
                'categories': newBook.categories,
                "year": newBook.year,
                "author": author,
                "publisher":publisher
            }).save().then((rec)=>{
                console.log("books saved successfully...",rec);
                author.save();
                publisher.save();
                Ember.set(_this,'isAdded',true);
                console.log(Ember.get(_this,'isAdded'),"+_)(_+");
                
            }).catch((err)=>{
                console.log("error in adding book...",err);
                
            })
            this.send('toggleBookModalDialog');
        },
        addAuthor(newAuthor) {
            console.log('addAuthor()');
            this.store.createRecord('author', {
                "name": newAuthor.name,
                "country": newAuthor.country,
            }).save().then((rec) => {
                console.log('success---', rec);
            }).catch((err) => {
                console.log('failure---', err);
            })
        },
        addPublisher(newPublisher) {
            this.store.createRecord('publisher', {
                "name": newPublisher.name,
                "address": newPublisher.address,
                "phone":newPublisher.phone
            }).save().then((rec) => {
                console.log('success---', rec);
            }).catch((err) => {
                console.log('failure---', err);
            })
        }
    }
});