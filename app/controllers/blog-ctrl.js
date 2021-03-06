'use strict';

angular
  .module('GameGalaxy')
  .controller('BlogCtrl', function($scope, BlogsFactory, $routeParams, GamesFactory, $location, $rootScope, UserFactory, $window) {

    $scope.disqusConfig = {
      disqus_shortname: `gamegalaxy`,
      disqus_identifier: $routeParams.id,
      disqus_url: `https://game-galaxy-blog.firebaseapp.com/#!/blogs/${$routeParams.id}`
    };

    $scope.moby = {
      cover: "",
      game: "",
      release: "",
      platforms: "",
      description: "",
      genres: "",
    };

    $scope.userKey = "";

    $scope.viewObject = {
      views: ""
    };

    BlogsFactory.getThisBlog($routeParams.id)
        .then(item => {
      item.id = $routeParams.id;
      $scope.thisBlog = item;
      $scope.viewObject.views = $scope.thisBlog.views + 1;
      BlogsFactory.addView($scope.viewObject, $scope.thisBlog.id)
      .then( (views) => {
        $scope.thisBlog.views = views.data.views;
      });
      GamesFactory.getBlogMobyGame($scope.thisBlog.mobyID)
      .then( (title) => {
        $scope.moby.description = title.games[0].description;
        $scope.moby.cover = title.games[0].sample_cover.image;
        $scope.moby.release = title.games[0].platforms[0].first_release_date;   
        $scope.moby.platforms = title.games[0].platforms;   
        $scope.moby.genres = title.games[0].genres;                               
      });
      UserFactory.checkForUser($scope.thisBlog.uid)
      .then(data => {
        $scope.userKey = data[0].key;  
      });
    });

  });

