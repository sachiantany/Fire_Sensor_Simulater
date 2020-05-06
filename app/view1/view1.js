'use strict';


angular.module('myApp.view1', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', function ($scope, $http) {

        $scope.sensorList = [];

        $scope.boolValue = 'Active';


        $http.get("http://localhost:8080/firealarm/sensors").then(
            function successCallback(response) {
                $scope.sensorList = response.data;

                for (let x = 0; x < $scope.sensorList.length; x++) {

                    $scope.sensorList[x].co2 *= 10;
                    $scope.sensorList[x].smoke *= 10;
                }


            },
            function errorCallback(response) {
                console.log("Unable to perform get request");
            }
        );


    });
