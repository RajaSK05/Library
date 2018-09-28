import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('books', function() {});
  this.route('authors');
  this.route('publishers');
  this.route('home');
  this.route('book',{ path: '/books/:book_id' });
  this.route('author',{ path: '/authors/:author_id' });
  this.route('publisher',{ path: '/publishers/:publisher_id' });
  this.route('login');
});

export default Router;
