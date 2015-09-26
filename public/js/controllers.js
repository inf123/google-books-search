'use strict';

bookSearchApp.controller('BookSearchCtrl', ['$scope', '$http',
  function ($scope, $http) {
    // Search form submitted
    $scope.search = function() {
      console.log('Search query: ' + $scope.query);

      // Load google books json
      $http.get('data/books.json').
        then(function(response) {
          $scope.books = response.data.items;
        }, function(response) {
          alert('Error loading book list.');
        });
    };
  }
]);

