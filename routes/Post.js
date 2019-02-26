const PostM=require('../models/post_model');
var ObjectId = require('mongodb').ObjectID;

app.route('/post/add_post')
.all(function(req, res, next) {
	next();
})
.get(function(req, res) {
  res.render('add_post');
})
.post(function(req, res) {
	var doc={user_id: ObjectId("56b43fd6049bda5d9ded67f0"), title: req.body.title, body:req.body.body,created_on:new Date(),updated_on:new Date()};
    	PostM.create(doc,function(err,id){
  			res.redirect('/post');
  		});
});


app.route('/post/edit_post/:id')
.all(function(req, res, next) {
	next();
})
.get(function(req, res) {	
	PostM.view(ObjectId(req.params.id),function(err, docs) {
	//console.log(docs);	
    res.render('edit_post',{vdata:docs});
  });
})
.post(function(req, res) {
	var doc={title: req.body.title, body:req.body.body,updated_on:new Date()};
    	PostM.update(ObjectId(req.params.id),doc,function(err,id){
  			res.redirect('/post');
  		});
});


app.route('/post')
.all(function(req, res, next) {
	next();
})
.get(function(req, res) {
	PostM.show(function(err, docs) {
    res.render('list_post',{vdata:docs});
  })	
})


