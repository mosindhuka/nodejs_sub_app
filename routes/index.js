// use app in here to bind the routes
app.get('/',function (req, res) {
	res.render('index');
});

require('./Post');
