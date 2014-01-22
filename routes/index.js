
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'A backbone To Do app' });
};
