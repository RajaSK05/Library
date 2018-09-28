import Component from '@ember/component';

export default Component.extend({
    newAuthor: {
        name: null,
        country: null,
    },
    init() {
        this._super(...arguments);
        if (this.get('author')) {
            this.set('newAuthor.name', this.get('author.name'));
            this.set('newAuthor.country', this.get('author.country'));
        }
        console.log("author- ",this.get('author.id'));
        
    },
    actions: {
        addAuthor() {
            this.get('addAuthor')(this.newAuthor);
        },
        editAuthor() {
            this.get('editAuthor')(this.newAuthor);
        },
        closeAuthorForm() {
            this.get('closeAuthorForm')();
        }

    },
    willDestroyElement() {
        this.set('newAuthor.name', null);
        this.set('newAuthor.country', null);
    }
});
