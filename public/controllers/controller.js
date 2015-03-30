var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', 
	['$scope', '$http', 
	function($scope, $http) {
    console.log("Hello World from controller");
    var refresh = function(){


    
    $http.get("/contactList").success(
		// /contact list is the route where we are going to create, to get our data from
	    function(response)
	    {
	    	console.log("i got the data i requested");
	    	$scope.contactList=response;
	    	//response is what we received.
	    	$scope.contact="";
	    }
    )
};
    refresh();

 //    person1 = {name: 'tim', email: 'tim@email.com', number:'123456789'};
	// person2 = {name: 'jim', email: 'chuankengchou@gmail.com', number: '6472276530'};
	// person3 = {name: 'bil', email: 'billychou_ib@gmail.com', number: '7786682829'};

	// var contactlist= [person1,person2,person3];
	// $scope.contactData=contactlist;
	$scope.addContact=function(){
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	}

}
]
);


