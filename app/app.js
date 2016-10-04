/**
 * Created by vmanthena on 27-Sep-16.
 */

var rememberGameApp = angular.module('rememberGameApp', []);
rememberGameApp.controller('GameCtrl', function GameCtrl($scope) {

    var tileNames = ['AUDI', 'BMW', 'HONDA', 'FORD', 'SKODA', 'SUZUKI',
        'NISSAN', 'JAGUAR'];

    var tileDeck = makeDeck(tileNames);
    
    $scope.grid = makeGrid(tileDeck);
    $scope.message = 'Click on a tile.';
    $scope.unmatchedPairs = tileNames.length;
    $scope.matchedPairs = 0;
    $scope.Game={};

    function Tile(title) {
        this.title = title;
        this.flipped = false;

    }
    Tile.prototype.flip = function(tile) {
        this.flipped = !this.flipped;
    }
    
        $scope.flipTile = function(tile) {
            if (tile.flipped) {
                return;
            }

            tile.flip();
            
            if (!$scope.firstPick || $scope.secondPick) {

                if ($scope.secondPick) {
                    $scope.firstPick.flip();
                    $scope.secondPick.flip();
                    $scope.firstPick = $scope.secondPick = undefined;
                }
                $scope.firstPick = tile;
                $scope.message = 'Pick one more card.';

            } else {

                if ($scope.firstPick.title === tile.title) {
                    $scope.firstPick.title="hide";
                    tile.title="hide";
                    $scope.firstPick = $scope.secondPick;
                    $scope.unmatchedPairs--;
                    $scope.matchedPairs++;
                    $scope.message = ($scope.unmatchedPairs > 0) ? 'Good job! Keep going.' :'You Won The Game.';
                }
                else {
                    $scope.secondPick = tile;
                    $scope.firstPick.flip();
                    $scope.secondPick.flip();
                    $scope.firstPick = $scope.secondPick = undefined;
                    $scope.message = 'Try again.';
                }
            }
        }

/*
    Game.MESSAGE_CLICK = 'Click on a tile.';
    Game.MESSAGE_ONE_MORE = 'Pick one more card.';
    Game.MESSAGE_MISS = 'Try again.';
    Game.MESSAGE_MATCH = 'Good job! Keep going.';
    Game.MESSAGE_WON = 'You Won The Game';
*/


    function makeDeck(tileNames) {
        var tileDeck = [];
        tileNames.forEach(function(name) {
            tileDeck.push(new Tile(name));
            tileDeck.push(new Tile(name));
        });
        return tileDeck;
    }


    function makeGrid(tileDeck) {
        var gridDimension = Math.sqrt(tileDeck.length),
            grid = [];
        for (var row = 0; row < gridDimension; row++) {
            grid[row] = [];
            for (var col = 0; col < gridDimension; col++) {
                grid[row][col] = removeRandomTile(tileDeck);
            }
        }

        return grid;
    }
    function removeRandomTile(tileDeck) {
        var i = Math.floor(Math.random()*tileDeck.length);
        return tileDeck.splice(i, 1)[0];
    }
});

rememberGameApp.directive('card', function() {
    return {
        template: '<div class="container">' +
        '<div class="card" ng-class="{flipped: tile.flipped}">' +
        '<img  class="front" ng-src="img/back.jpg">' +
        '<img  class="back" ng-src="img/{{tile.title}}.jpg">' +

        '</div>'
    }
});