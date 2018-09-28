import Controller from '@ember/controller';

export default Controller.extend({
    storage:Ember.inject.service(),
    isEditPublisher:false,
    actions:{
        getConfirm(){
            if(confirm("Deleting this publisher will delete all the books associated with it.\nAre you sure want to delete this publisher?")){
                this.store.findRecord('publisher', this.model.id).then((publisher)=>{
                    console.log("del - publisher - ",publisher);
                    let tempPublisher=publisher;
                    tempPublisher.books.forEach((book)=>{
                        this.store.findRecord('book',book.id).then((book)=>{
                            console.log("del - book - ",book);
                            book.destroyRecord();
                        })
                    })
                    publisher.destroyRecord();
                }).catch((err)=>{
                    console.log("error del - publisher ",err);
                    
                })
                this.transitionToRoute('publishers');
            }
        },
        toggleIsEditPublisher(){
            this.toggleProperty('isEditPublisher');
        },
        editPublisher(){
            
        }
    }
});
