'use strict';

angular.module('bikes')

.controller('BikeController', ['bikeFactory', function(bikeFactory) {
    var self = this;

    self.bikes = bikeFactory.getBikes();

}])

.controller('BikeDetailController', ['$stateParams', 'bikeFactory', '$location', function($stateParams, bikeFactory, $location) {

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
        location.href = "/bike_garage/app/#";
    }

    //delete bike
    self.remove = function(item) {
        _.remove(self.bikes, function(bike) {
            return item._id === bike._id;

        });
        location.href = "/bike_garage/app/#";
    };

}])


.controller('AddBikeController', ['bikeFactory', '$location', function(bikeFactory, $location) {

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

        console.log(self.mybike);

        self.bikes.push(self.mybike);
        location.href = "/bike_garage/app/#";

        self.mybike = { _id: self.maxId(self.bikes) + 1, model: "", brand: "", image: "", category: "", year: "" };
    }

}]);
