import Controller, {inject as controller} from '@ember/controller';
import {get, set} from '@ember/object';
export default Controller.extend({
    storage:Ember.inject.service(),
    booksController:controller('books'),
    isEditBook:false,
    
    actions:{
        toggleIsEditBook(){
            this.toggleProperty('isEditBook');
        },
        getConfirm(){
            if(confirm("Are you sure want to delete this book?")){
                this.store.findRecord('book', this.book.id).then((book)=>{
                    book.destroyRecord();
                })
                this.transitionToRoute('books');
            }
        },
        editBook(newBook){
            let author = this.store.peekRecord('author',newBook.author.id);
            let publisher = this.store.peekRecord('publisher',newBook.publisher.id);
            this.store.findRecord('book',this.book.id).then((book)=>{
                set(book,'title',newBook.title);
                set(book,'author',author);
                set(book,'categories',newBook.categories);
                set(book,'publisher',publisher);
                set(book,'year',newBook.year);
                book.save().then((res)=>{
                    author.save();
                    publisher.save();
                })
            });
            this.send('toggleIsEditBook');
        }
    }
});
