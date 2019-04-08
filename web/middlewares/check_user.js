module.exports.checkUser = function(req, res, next) {
    if(req.session.user_id)
    {
      next();
    }
    else
    {
        res.redirect(app.locals.BASEURL);
    }
}

