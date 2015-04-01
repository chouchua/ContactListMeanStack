var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', 
	['$scope', '$http', 
	function($scope, $http) {
    console.log("Hello World from controller");
    var refresh = function(){


    //gets from database each time.
    $http.get("/contactList").success(
		// /contact list is the route where we are going to create, to get our data from
	    function(response)
	    {
	    	console.log("i got the data i requested");
	    	$scope.contactList=response;
	    	//response is what we received.
	    	$scope.contact=""; //clear input boxes.
	    }
    )
};
    refresh(); //get the data right when page is loaded

 //    person1 = {name: 'tim', email: 'tim@email.com', number:'123456789'};
	// person2 = {name: 'jim', email: 'chuankengchou@gmail.com', number: '6472276530'};
	// person3 = {name: 'bil', email: 'billychou_ib@gmail.com', number: '7786682829'};

	// var contactlist= [person1,person2,person3];
	// $scope.contactData=contactlist;
	
	$scope.addContact=function(){
		//receive information from input boxes (index.html).
		//displays on console
		console.log($scope.contact);
		//send input box info to the server.
		$http.post('/contactlist',$scope.contact).success(function(response){
			console.log(response); //respond when success. id tag is added 
			//which means that the db successfully added into db.
			refresh();

		});
	}
	$scope.remove=function(id){
		console.log(id);
		$http.delete('/contactlist/'+ id);
	}

}
]
);


