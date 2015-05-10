
/*
 * GET home page.
 */

exports.index = function(req, res){
	//return;
  res.render('index');
};

exports.boards = function(req, res){
	return;
  //res.locals.session = req.session;
	res.render('boards');
};

exports.sensors = function(req, res){
  res.render('sensors');
};

exports.robotics = function(req, res){
  res.render('robotics');
};