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



        $scope.loadData = function() {
            $http.get("http://localhost:8080/firealarm/sensors").then(
                function successCallback(response) {
                    $scope.sensorList.clear;
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
        };

        $scope.sensor = {};

        $scope.saveData = function (formId, id) {

            $('#exampleModal'.concat(id)).modal('toggle');

            $scope.sensor = {
                sensorname: document.getElementById('sensorname'.concat(id)).value,
                floor: document.getElementById('floor'.concat(id)).value,
                room: document.getElementById('room'.concat(id)).value,
                status: document.getElementById('status'.concat(id)).value,
                co2: parseFloat(document.getElementById('co2'.concat(id)).value) / 10,
                smoke: parseFloat(document.getElementById('smoke'.concat(id)).value) / 10

            };


            console.log("data " + $scope.sensor.sensorname);




            $http.put("http://localhost:8080/firealarm/sensors/"+id, $scope.sensor).then(function (response) {

                if (response.data)
                    alert("Put Data Method Executed Successfully!");

            }, function (response) {

                alert("Put Data Method Failed to Execute!");



            });





        };





    });
