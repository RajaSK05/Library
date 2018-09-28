import Controller from '@ember/controller';
import {set} from '@ember/object';
export default Controller.extend({
    storage:Ember.inject.service(),
    isEditAuthor:false,
    actions:{
        getConfirm(){
            if(confirm("Deleting this Author will delete all the books associated with it.\nAre you sure want to delete this author?")){
                this.store.findRecord('author', this.author.id).then((author)=>{
                    console.log("del - author - ",author);
                    let tempAuthor=author;
                    tempAuthor.books.forEach((book)=>{
                        this.store.findRecord('book',book.id).then((book)=>{
                            console.log("del - book - ",book);
                            book.destroyRecord();
                        })
                    })
                    author.destroyRecord();
                }).catch((err)=>{
                    console.log("error del - author ",err);
                    
                })
                this.transitionToRoute('authors');
            }
        },
        toggleIsEditAuthor(){
            this.toggleProperty('isEditAuthor');
        },
        editAuthor(newAuthor){
            this.store.findRecord('author',this.author.id).then((author)=>{
                set(author,'name',newAuthor.name);
                set(author,'country',newAuthor.country);
                author.save();
            });
            this.send('toggleIsEditAuthor');
        }
    }
});
