var express = require('express');
var router = express.Router();
var User = require('../models/model.js');
var request = require('request');
var ts = Date.now();
var md5 = require('md5');
var publicKey = process.env.PUBLIC_KEY;
var privateKey = process.env.PRIVATE_KEY;




//new 
router.get('/new',function(req,res){
	res.render('new.ejs');
});


//index
router.get('/',function(req,res){
	User.find().then(function(user){
		res.render('index.ejs',{user});
	})
});


//show
router.get('/:comic_id',function(req,res){
	var comic_id = req.params.comic_id;
	var comic_id = comic_id.replace(' ', '%20');
	var data;
	request("http://gateway.marvel.com/v1/public/comics?title=" + comic_id + "&ts="+ ts + "&apikey=" + publicKey + "&hash=" + md5(ts+privateKey+publicKey)
		,function(error,response,body){	
			var myData = JSON.parse(body);
			res.render('show.ejs', {myData}); 
	 });		
});

//edit
router.get('/:id/edit', function(req,res){
	User.findById(req.params.id).then(function(user){
		res.render('edit.ejs', {user});
	})
});


//update
router.put('/:id',function(req,res){
	User.findOneAndUpdate({
		_id:req.params.id},{
			$set:req.body},
			function(user){
				console.log(user);
			});
	res.redirect('/users');
});

//create 
router.post('/',function(req,res){
	var user = new User(req.body);
	user.save(function(err){
		if (err) {
			console.log(err);
		}else{
			console.log('new creation');
		}
	})
	res.redirect('/users/');
});
//delete 
router.delete('/:id',function(req,res){
	User.findOneAndRemove({_id:req.params.id},
		function(user){
			res.redirect('/users/');
		});
});


module.exports = router;


///trash 
// 	console.log('-------------------');
// 	console.log('this is ts ' + ts);
// 	console.log('this is hash ' + md5(ts+privateKey+publicKey));
// 	console.log('-------------------');

// console.log(myData.data.results[0].prices[0].price);
// console.log(myData.data.results[0].creators.items[0].name);
// console.log(myData.data.results[0].creators.items[0].role);
// console.log(myData.data.results[0].creators.items[1].name);
// console.log(myData.data.results[0].creators.items[1].role);
 	// for (var i = 0; i < myData.data.results.length; i++) {
		 	// console.log(myData.data.results[i].title);	
		 	// console.log(myData.data.results[i].dates[0].date);
		 	// }
 	// console.log(myData);
 	 	// console.log("===========")
		 	// var myDate = myData.data.results[0].dates[0].date;
		 	// var newDate = Date.parse(myDate);
		 	// console.log(newDate.toLocaleFormat());
		 	 	// console.log('new date = ' + myDate.toDateString());		 	
		 	// console.log("===========");
