import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        return this.store.findAll('book').then((result) => {
            console.log(result);
            return result.content;
        }).catch((err) => {
            console.log('error on updating books');
        })
    },
    setupController(controller,model){
        controller.set('books',model);
    }
});
