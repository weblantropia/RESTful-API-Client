/**
 *
 * @About:      Main Javascript UX
 * @File:       app.js
 * @Date:       $Date:$ Sep-2016
 * @Version:    $Rev:$ 1.0
 * @Developer:  Federico Guzman (http://about.me/federicoguzman)
 **/
(function() {

    'use strict';
    angular.module('App',['ngSanitize'], function(){
        
    })
    .controller("apiclient", ["$scope", "$http", function($scope, $http){
        
        $scope.request = {};
        $scope.response = {};
        $scope.methods = ['GET','POST','PUT','DELETE'];
        $scope.request.method = 'GET';
        $scope.headers = [{param:'', value: ''}];
        $scope.request.body = '';
        $scope.removeParam = function(array, index) {
            array.splice(index, 1);
        };
        $scope.addParam = function(array, template) {
            array.push(template);
        };
        $scope.apiRequest = function(){
            
            if(!$scope.request.endpoint)
                return false;
            var headers ={}
            //headers = {'Content-Type': 'application/x-www-form-urlencoded'};            
            if($scope.headers.length > 0 && $scope.headers[0].param != '')
            {
                for (var key in $scope.headers) {
                    var par = $scope.headers[key].param;
                    var val = $scope.headers[key].value;
                    if( typeof $scope.headers[key].param !== 'undefined' || $scope.headers[key].param !== null || $scope.headers[key].param !== '' ){
                        headers[par] = val;
                    }
                }
            }
            var body = $scope.request.body;
            if(body === null || body === '')
            {
                body = 'foo=bar';
            }
            
            $http({
              method  : $scope.request.method,
              url     : $scope.request.endpoint,
              data    : body,  // pass in data as strings
              headers : headers
                
             })
            .success(function(data, status, headers, config){
                headers()['Status Code'] = status;
                $scope.response.headers = JSON.stringify(headers(), null, 2);
                $scope.response.body = data;
                $scope.response.preview = JSON.stringify(data, null, 2);
                $scope.response.beauty = JSON.stringify(data, null, 2);                
            })
            .error(function(error, status, headers, config){
                headers()['Status Code'] = status;
                $scope.response.headers = JSON.stringify(headers(), null, 2);
                $scope.response.body = error;
                $scope.response.preview = JSON.stringify(error, null, 2);
                $scope.response.beauty = JSON.stringify(error, null, 2);
            });
        }
        
        $( "#request-toggle" ).on('click', function() {
            $( ".request-block .panel-body" ).slideToggle( "fast", function() {
                if ($(this).is(':visible')) {
                     $( "#request-toggle span" ).html('[-]');                
                } else {
                     $( "#request-toggle span" ).html('[+]');                
                }
            });
        });
        $( "#response-toggle" ).on('click', function() {
            $( ".response-block .panel-body" ).slideToggle( "fast", function() {
                if ($(this).is(':visible')) {
                     $( "#response-toggle span" ).html('[-]');                
                } else {
                     $( "#response-toggle span" ).html('[+]');                
                }
            });
        });        
        $('textarea#request-body').focus(function () {
            $(this).animate({ height: "10em" }, 500);
        }).focusout(function(){
            $(this).animate({ height: "5em" }, 500);
        });       
    }]);
    
})();