import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        return this.store.findRecord('publisher', params.publisher_id).then((rec)=>{
            console.log("success in fetching publisher record...",rec);
            return rec;
        }).catch((err)=>{
            console.log("errorrrrr ",err);
            
        });
    }
});
