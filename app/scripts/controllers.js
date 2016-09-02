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
