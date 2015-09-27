// Controller unit tests

describe('Controllers', function() {
  beforeEach(module('bookSearchApp'));

  describe('BookSearchCtrl', function() {
    var scope, controller, httpMock;

    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
      scope = $rootScope.$new();
      httpMock = $httpBackend;
      httpMock.whenGET('https://www.googleapis.com/books/v1/volumes?q=javascript+books').respond({
        items: [
          { id: '1', volumeInfo: { title: 'JavaScript: The Good Parts' }},
          { id: '2', volumeInfo: { title: 'Professional JavaScript for Web Developers' }},
          { id: '3', volumeInfo: { title: 'High Performance JavaScript' }},
          { id: '4', volumeInfo: { title: 'Eloquent JavaScript, 2nd Ed.' }}
        ]
      });
      controller = $controller('BookSearchCtrl', {
        $scope: scope,
      });
    }));

    describe('$scope.query', function() {
      it('should be empty after search', function() {
        scope.query = 'javascript books';
        scope.search();
        httpMock.flush();
        expect(scope.query).toBe('');
        scope.clearHistory();
      });
    });
    
    describe('$scope.queryHistory', function() {
      it('should be empty on start', function() {
        expect(scope.queryHistory.length).toBe(0);
      });

      it('should have 1 item after 1 search', function() {
        scope.query = 'lorem ipsum';
        scope.search();
        expect(scope.queryHistory.length).toBe(1);
        scope.clearHistory();
      });

      it('should have 1 item after 2 identical searches', function() {
        scope.query = 'dolor sit amet';
        scope.search();
        scope.query = 'dolor sit amet';
        scope.search();
        expect(scope.queryHistory.length).toBe(1);
        scope.clearHistory();
      });

      it('should have 10 items after 11 unique searches', function() {
        var searches = ['sed vivamus', 'consequat augue', 'viverra', 'sollicitudin', 'ullamcorper hac',
                        'nisl nulla', 'vestibulum', 'elementum curae', 'nostra senectus', 'condimentum', 'tristique'];

        angular.forEach(searches, function(value) {
          scope.query = value;
          scope.search();
        });
        
        expect(scope.queryHistory.length).toBe(10);
      })
    });

    describe('$scope.books', function() {
      it('should have 4 items after search for javascript books', function() {
        scope.query = 'javascript books';
        scope.search();
        httpMock.flush();
        expect(scope.books.length).toBe(4);
      });
    });
  });
});
