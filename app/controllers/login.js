import Controller from '@ember/controller';

export default Controller.extend({
    applicationController: Ember.inject.controller('application'),
    storage:Ember.inject.service('storage'),
    user: null,
    uname: null,
    password: null,
    actions: {
        validateLogin() {
            // this.store.createRecord('user',{
            //     uname:'kathir',
            //     password:'kathir.v',
            //     type:'admin'
            // }).save().then((rec)=>{
            //     console.log("user saved successfully...",rec);

            // })
            this.store.findAll('user').then((users) => {
                let user=users.filterBy('uname',this.uname);
                console.log(user, " 789 ", this);
                if (user.length == 1) {
                    if (user.firstObject.password == this.password) {
                        this.applicationController.set('user', this.uname);
                        this.storage.set('user',this.uname);
                        this.send('closeLoginForm');
                    }else{
                        this.set('error',"Invalid password");
                    }
                }else{
                    console.log(this.storage.get('user'));
                    
                    this.set('error',"Invalid user")
                }
            })
        },
        closeLoginForm() {
                this.set('error', null),
                this.set('uname', null),
                this.set('password',null)
            
            console.log("this---", this);
            let previousTransition = this.previousTransition;
            console.log(previousTransition);

            if (previousTransition) {
                this.set('previousTransition', null);
                previousTransition.retry();
            } else {
                // Default back to homepage
                this.transitionToRoute('home');
            }
        }
    }
});
