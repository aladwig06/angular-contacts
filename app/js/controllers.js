'use strict';

/* Controllers */

function contactsController($scope){
  
    $.ajax({
        type: "GET",
        //dataType: "JSONP",
        url: "http://localhost:8000/contacts",
        //jsopCallback: 'callback',
        //crossDomain: true,
        success: function(data){
            var myData = angular.fromJson(data);
            $scope.$apply(function(){
                $scope.contacts = myData;
                console.log('data' + data);
            });
        },
        error: function(data){
             console.log('error' + data);
        }
    
   });   
    
}

function contactDetailController($scope, $location, $routeParams){
    
     $.ajax({
        type: "GET",
        url: "http://localhost:8000/contacts/" + $routeParams.id,
        success: function(data){
            var myData = angular.fromJson(data);
            $scope.$apply(function(){
                $scope.contact = myData;
            });
        },
        error: function(data){
             console.log('error' + data);
        }
    
   });
     
        $scope.removeContact = function(){
          
           
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8000/contacts/" + $routeParams.id,
            success: function(){
                
                $scope.$apply(function(){
                    $location.path('/contacts');    
                });
                
                
            },
            error: function(err){
                $scope.response = "Error occured: " + err;
            }
            
        });
        
    } 
}

function newContactController($scope, $location){

    $scope.addNewContact = function(newContact){
        console.log('adding new contact ' + $scope.newContact);
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/contacts",
            data: $scope.newContact,
            success: function(data){
                
                $scope.$apply(function(){
                    $location.path('/contacts');    
                });
            },
            error: function(data){
                var myData = angular.fromJson(data);
                $scope.response = myData;
            }
            
            
            
        });
    }

}