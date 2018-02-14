'use strict';

let authenticate = (AuthFactory) =>
  new Promise((resolve, reject) => {
    AuthFactory.usercheck().then(user => {
      if (user) {
        console.log("user check - pass");
        resolve();
      } else {
        console.log("user check - fail");
        reject();
      }
  });
});

angular
  .module('GameGalaxy', ["ngRoute", "ngTagsInput", "ngQuill", "angularUtils.directives.dirDisqus", "ngSanitize", "ngTagsInput"])
  .constant("FBUrl", "https://galaxy-game-blog.firebaseio.com/")
  .config($routeProvider => {
    $routeProvider
      .when("/home", {
        templateUrl: "partials/home-splash.html",
        controller: "HomeCtrl"
      })
      .when("/discover", {
        templateUrl: "partials/discover.html",
        controller: "DiscoverCtrl",
      })
      .when("/community", {
        templateUrl: "partials/community.html",
        controller: "CommunityCtrl",
      })
      .when("/profile", {
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl",
        resolve: { authenticate }        
      })
      .when("/community/view/:key", {
        // TODO: fix profile header display bc it is ugly
        templateUrl: "partials/view-profile.html",
        controller: "ViewProfileCtrl",
      })
      .when("/myblogs/:uid", {
        templateUrl: "partials/my-blogs.html",
        controller: "MyBlogsCtrl",
        resolve: { authenticate }                
      })
      .when("/blogs/new", {
        templateUrl: "partials/blog-edit.html",
        controller: "BlogNewCtrl",
        resolve: { authenticate }
      })
      .when("/blogs/:id", {
        // TODO: add tags to placeholder posts
        templateUrl: "partials/blog.html",
        controller: "BlogCtrl",
      })
      .when("/blogs/:id/edit", {
        // TODO: add http get and scope.model to blog-edit-ctrl
        // TODO: write http put for updating post
        templateUrl: "partials/blog-edit.html",
        controller: "BlogEditCtrl",
        resolve: { authenticate }        
      })
      .when("/search/:title", {
        templateUrl: "partials/search.html",
        controller: "SearchCtrl",
      })
      .otherwise("/home");
  })
  .run(FBCreds => {
    let authConfig = {
        apiKey: FBCreds.apiKey,
        authDomain: FBCreds.authDomain
    };
    firebase.initializeApp(authConfig);
  });