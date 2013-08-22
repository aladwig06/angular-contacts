'use strict';

/* Controllers */

function contactsController($scope, $location, $dialog){

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
                
            });
        },
        error: function(data){
             console.log('error' + data);
        }
    
   });
   
         $scope.opts = {
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                templateUrl: 'partials/new-contact-form.html',
                controller: 'newContactController'
            };
            
            $scope.openDialog = function(){
                console.log("openDialog called");
                var d = $dialog.dialog($scope.opts);
                d.open().then(function(result){
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
                                
                            });
                        },
                        error: function(data){
                             console.log('error' + data);
                        }
                    
                        });
                        });
            };
                            
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

function newContactController($scope, $location, dialog){
    //was $scope.addNewContact
    $scope.close = function(newContact){
        console.log('adding new contact ' + $scope.newContact);
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/contacts",
            data: $scope.newContact,
            success: function(data){
                
                $scope.$apply(function(){
                   dialog.close();
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

