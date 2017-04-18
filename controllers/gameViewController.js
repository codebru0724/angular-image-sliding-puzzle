	'use strict';

  mainApp.controller('gameViewController', function ($scope) {

    return true;
  });

  mainApp.factory('slidingPuzzle', function() {

    function shuffle(a) {
      var q;
      for (var j, x, i = a.length; i; j = parseInt(Math.random() * i, 10), x = a[--i], a[i] = a[j], a[j] = x) { q = 0; }
      return a;
    }

    function SlidingPuzzle(rows, cols) {

      this.grid = [];          
      this.moves = 0;
                
      this.shuffle = function() {

        var tiles = [];

        this.traverse(function(tile) {
          tiles.push(tile);
        });

        shuffle(tiles);

        this.traverse(function(tile, row, col) {
          this.grid[row][col] = tiles.shift();
        });

        this.moves = 0;

      };

      this.traverse = function(fn) {
        for (var row = 0; row < rows; row++) {
          for (var col = 0; col < cols; col++) {
            fn.call(this, this.grid && this.grid[row] ? this.grid[row][col] : undefined, row, col);
          }
        }
      };

      // initialize grid
      var id = 1;
      this.traverse(function(tile, row, col) {

        if (!this.grid[row]) {
          this.grid[row] = [];
        }

        this.grid[row][col] = {
          id: id++,
          empty: (row === rows - 1) && (col === cols - 1)
        };

        if (this.grid[row][col].empty) {
          this.empty = this.grid[row][col];
        }

      });
    }

    return function(rows, cols) {
      return new SlidingPuzzle(rows, cols);
    };
  });

  mainApp.directive('slidingPuzzle', function(slidingPuzzle){
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: './templates/boardView.html',
      scope: {
          src: '@'
      },

      link: function(scope, element, attrs) {

        var image = new Image();
        var rows = 3, cols = 3;
        
        function create() {
          scope.puzzle = new slidingPuzzle(rows, cols);          
        }

        function tile() {          

          var width = image.width / cols,
              height = image.height / rows;

          scope.puzzle.traverse(function(tile, row, col) {
            tile.style = {
              width: width + 'px',
              height: height + 'px',
              background: (tile.empty ? 'none' : "url('" + scope.src + "') no-repeat -" + (col * width) + 'px -' + (row * height) + 'px')
            };
          });

          scope.puzzle.shuffle();
        }        

        attrs.$observe('src', function(src) {        
          image.src = src;
          image.onload = function() {            
            scope.$apply(function() {
              tile();
            });
          };
        });

        create();

      }
    }
  });