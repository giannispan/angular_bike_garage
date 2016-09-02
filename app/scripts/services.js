'use strict';

angular.module('bikes')

.service('bikeFactory', function() {

    var bikes = [{
        _id: 0,
        model: 'Gambler 710',
        brand: 'Scott',
        image: 'images/gambler.jpg',
        category: 'downhill',
        year: 2016,
    }, {
        _id: 1,
        model: 'Genious LT 720',
        brand: 'Scott',
        image: 'images/genius.jpg',
        category: 'enduro',
        year: 2015,
    }, {
        _id: 2,
        model: 'Enduro',
        brand: 'Specialized',
        image: 'images/enduro.jpg',
        category: 'enduro',
        year: 2014,
    }, {
        _id: 3,
        model: 'Speedster 60',
        brand: 'Scott',
        image: 'images/speedster.jpg',
        category: 'road',
        year: 2013,
    }, {
        _id: 4,
        model: 'Attain GTC Race',
        brand: 'Cube',
        image: 'images/cube.jpg',
        category: 'road',
        year: 2016,
    }];

    this.getBikes = function() {

        return bikes;

    };

    this.getBike = function(id) {
        return _.find(bikes, { _id: id });
    };
});
