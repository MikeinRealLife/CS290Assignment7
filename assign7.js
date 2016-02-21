var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);


app.get('/', function(req, res){

  console.log(req.query);
  var urlData = [];

  for (var g in req.query){
    urlData.push({'name':g, 'value':req.query[g]});
  }
  var context = {};
  context.getData = urlData;

  res.render('assign', context);
});

app.post('/', function(req, res){

  console.log(req.query);
  console.log(req.body);
  var urlParams = [];

  for (var g in req.query){
    urlParams.push({'name':g, 'value':req.query[g]});
  }
  var context = {};
  context.urlList = urlParams;

  var postParams = [];

  for (var p in req.body) {
    postParams.push({'name':p, 'value':req.body[p]});
  }

  context.postList = postParams;

  res.render('assign', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
