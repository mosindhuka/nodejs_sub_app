const PostM=require('../models/post_model');
const ObjectId = require('mongodb').ObjectID;

app.route('/post/add_post')
.all(function(req, res, next) {
	next();
})
.get(function(req, res) {
  res.render('add_post');
})
.post(async function(req, res) {
	var doc={user_id: ObjectId(req.session.user_id), title: req.body.title, body:req.body.body,created_on:new Date(),updated_on:new Date()};
    	 await PostM.create(doc);
       req.flash('message', 'Post created successfully !');
  		 res.redirect('/post');
});


app.route('/post/edit_post/:id')
.all(function(req, res, next) {
	next();
})
.get(async function(req, res) {	
	var docs=await PostM.view(ObjectId(req.params.id));
  res.render('edit_post',{vdata:docs});
  
})
.post(async function(req, res) {
	var doc={title: req.body.title, body:req.body.body,updated_on:new Date()};
    	  await PostM.update(ObjectId(req.params.id),doc);
  			req.flash('message', 'Post updated successfully !');
        res.redirect('/post');
  		
});


app.route('/post/delete_post/:id')
.all(function(req, res, next) {
  next();
})
.get(async function(req, res) { 
      await PostM.remove(ObjectId(req.params.id));
      req.flash('message', 'Post removed successfully !');
      res.redirect('/post');
});


app.route('/post')
.all(function(req, res, next) {
	next();
})
.get(async function(req, res) {
	  var docs=await PostM.show();
    res.render('list_post',{expressFlash: req.flash('message'),vdata:docs});	
})


