'use strict';
import { Author, View } from './connectors';
//connectors is like knex/maybe mongoose later with MongoDB
//connect database to the api calls (resolvers)

//resolvers are like actual enpoint calls to db
//how should server should respond to a query

//in graphQL return values keep getting passed down tree until
//SCALAR types are return, simple. string, num, boolean

//hard coded mock data here as fake db
const resolvers = {
  Query: {
    author( _, args) {
      return Author.find({where:args});
    },
    allAuthors() {
      return Author.findAll();
    }
  },
  Author: {
    posts(author) {
      return author.getPosts();
    }
  },

  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return View.findOne({ postId: post.id })
             .then((view) => view.views);
    },
  },
  // Post: {
  //   author(post) {
  //     return View.findOne({postId: post.id}).then (view => view.views);
  //   }
  // }
};

export default resolvers;