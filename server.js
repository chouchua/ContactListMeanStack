var express = require('express');
var app = express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist']); //which database and collection we are using
var bodyParser=require('body-parser');
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

//get data from server instead of controller.
app.get('/contactlist',
	function(req,res){
	//displays in the terminal server
	console.log("I received a GET request");
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs); //sends data back to controller
	})
	// get from server
	// person1 = {name: 'tim', email: 'tim@email.com', number:'123456789'};
	// person2 = {name: 'jim', email: 'chuankengchou@gmail.com', number: '6472276530'};
	// person3 = {name: 'bil', email: 'billychou_ib@gmail.com', number: '7786682829'};

	// var contactlist= [person1,person2,person3];
	// res.json(contactlist); //respond to get request and send response in json format
	app.post('/contactlist',function(req,res){
		console.log(req.body); //requests info from body, does
		//not know how to parse body. -> requires body parser.
		db.contactlist.insert(req.body,function(err,doc){
			res.json(doc); //send it back to controller
			//the function 
		})
	}
	)
});
app.delete('/contactlist/:id',function(req,res){
	var id=req.params.id; //get the value of id from url.
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);//send back to controller
	})
})
app.get('/contactlist/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
})
app.put('/contactlist/:id',function(req,res){
	var id= req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update:{$set: {name: req.body.name,email: req.body.email,number:req.body.number}},new : true},
		function(err,doc){
			res.json(doc);
		});

});
app.listen(3000);
console.log("server running on port 3000");
