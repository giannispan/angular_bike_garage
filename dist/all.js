'use strict';

angular.module('bikes', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        // route for the home page
            .state('app', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'views/header.html',
                },
                'content': {
                    templateUrl: 'views/menu.html',
                    controller: 'BikeController as vm'
                },
            }

        })

        // route for the bikedetail page
        .state('app.bikedetails', {
            url: 'menu/:id',
            views: {
                'content@': {
                    templateUrl: 'views/bikedetail.html',
                    controller: 'BikeDetailController as vm'
                }
            }
        })

        // route for the add bike page
        .state('app.addbike', {
            url: 'add',
            views: {
                'content@': {
                    templateUrl: 'views/add.html',
                    controller: 'AddBikeController as vm'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    });

'use strict';

angular.module('bikes')

.controller('BikeController', ['bikeFactory', function(bikeFactory) {
    var self = this;

    self.bikes = bikeFactory.getBikes();

}])

.controller('BikeDetailController', ['$state','$stateParams', 'bikeFactory', function($state, $stateParams, bikeFactory) {

    var self = this;
    var bike = bikeFactory.getBike(parseInt($stateParams.id, 10));

    self.bike = bike;
    self.bikes = bikeFactory.getBikes();

    // update bike
    self.updateBike = function(item) {
        bike = {
            _id: bike._id,
            model: bike.model,
            brand: bike.brand,
            category: bike.category,
            year: bike.year
        };
        $state.go('app');
    }

    //delete bike
    self.remove = function(item) {
        _.remove(self.bikes, function(bike) {
            return item._id === bike._id;

        });
        $state.go('app');
    };

}])


.controller('AddBikeController', ['$state','bikeFactory', function($state, bikeFactory) {

    var self = this;
    self.bike = [];
    self.bikes = bikeFactory.getBikes();

    //Find the maximun id 
    self.maxId = function() {
        var maxid = 0;
        self.bikes.map(function(obj) {
            if (obj._id > maxid) maxid = obj._id;
        });
        return maxid;
    }

    self.mybike = { _id: self.maxId(self.bikes) + 1, model: "", brand: "", image: "images/default.jpg", category: "", year: "" };

    self.addBike = function() {

        self.bikes.push(self.mybike);
        $state.go('app');

        self.mybike = { _id: self.maxId(self.bikes) + 1, model: "", brand: "", image: "", category: "", year: "" };
    }

}]);

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
