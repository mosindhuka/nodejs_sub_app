const PostM=require('../models/post_model');
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');
const path = require('path');
var multer  = require('multer');
var upload = multer({ dest: 'web/assets/uploads/' });

app.route('/post/add_post')
.all(function(req, res, next) {
	next();
})
.post(upload.single('image'),async function(req, res, next) {
  try {
      if(req.body.user_id && req.body.title && req.body.body)
      {
       var filename='';
       if(req.file)
       {
          var filename=req.file.filename;
       } 
	     var doc={user_id: ObjectId(req.body.user_id), title: req.body.title, body:req.body.body,image:filename,created_on:new Date(),updated_on:new Date()};
    	 var result=await PostM.create(doc);       
       res.json({"postId":result.insertedId});
      }
      else{
        res.json({"error":"Invalid Input !"});
      }
       } catch (err) {
    next(err);
  }
});


app.route('/post/edit_post/:id')
.all(function(req, res, next) {
	next();
})
.get(async function(req, res, next) {	
  try {
	var docs=await PostM.view(ObjectId(req.params.id));
  res.json(docs);
  } catch (err) {
    next(err);
  }
})
.post(upload.single('image'),async function(req, res, next) {
  try {
    if(req.body.user_id && req.body.title && req.body.body)
      {
      var image='';
      if(req.file)
      {
          image=req.file.filename;
          var imgpath='web/assets/uploads/'+req.body.old_image;
          if (req.body.old_image && fs.existsSync(imgpath)) {
            fs.unlinkSync(imgpath);
          }
      }
      else
      {
          image=req.body.old_image;
      }

	   var doc={title: req.body.title, body:req.body.body,image:image,updated_on:new Date()};
    	  var result=await PostM.update(ObjectId(req.params.id),doc);
  			res.json({"status":"Success"});
      }
      else{
        res.json({"error":"Invalid Input !"});
      }
   } catch (err) {
    next(err);
  }     
  		
});


app.route('/post/delete_post/:id')
.all(function(req, res, next) {
  next();
})
.get(async function(req, res, next) { 
  try {
      var result=await PostM.remove(ObjectId(req.params.id));
      if(result.deletedCount>0)
      {
        res.json({"status":"Success"});
      }
      else
      {
        res.json({"status":"Failed"});
      }
     } catch (err) {
    next(err);
  } 
});


app.route('/post')
.all(function(req, res, next) {
	next();
})
.get(async function(req, res, next) {
  try {
	  var docs=await PostM.show();
    res.json(docs);
    } catch (err) {
    next(err);
  }
})


