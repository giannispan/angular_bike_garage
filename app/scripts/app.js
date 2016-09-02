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
