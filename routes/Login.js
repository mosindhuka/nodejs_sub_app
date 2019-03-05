const LoginM=require('../models/login_model');
var ObjectId = require('mongodb').ObjectID;

app.route('/')
.all(function(req, res, next) {
	next();
})
.get(function(req, res) {
	res.render('index',{expressFlash: req.flash('message')});
})
.post(function(req, res) {
    LoginM.login({username:req.body.username,password:req.body.username},function(err,doc){
    	//console.log(doc);
    	if(doc.length > 0)
    	{
    		req.session.user_id=doc[0]._id;
    		req.session.role=doc[0].role;
    		req.session.username=doc[0].username;
    		res.redirect('/post');
    	}
    	else{
            req.flash('message', 'Invalid credentials!');
    		res.redirect('/');
    	}
    	
    });
})

app.route('/logout')
.get(function(req, res) {
    req.session.destroy();
    res.redirect('/');
})
