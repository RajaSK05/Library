import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
export default Controller.extend({
    classNamesList:['container'],
    storage:Ember.inject.service('storage'),
    hide:true,
    user:null,
    init(){
        this._super(...arguments);
        this.set('user',this.get('storage').get('user'));

    },
    actions:{
        toggleMenu(){
            this.toggleProperty('hide');
        },
        login(){
            this.transitionToRoute('login');
        },
        logout(){
            // this.get('storage').clear(this.user);
            this.get('storage').set('user',null);            
            this.set('user',null);            
            this.send('toggleMenu');
            this.transitionToRoute('home');
        }
    }
    
});
