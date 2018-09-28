import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        return this.store.findRecord('author', params.author_id).then((rec)=>{
            console.log("success in fetching author record...",rec);
            return rec;
        }).catch((err)=>{
            console.log("errorrrrr auth ",err);
        });
    },
    setupController(controller,model){
        controller.set('author',model);
    }
});
