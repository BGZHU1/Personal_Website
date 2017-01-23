

var pg = require('pg');
var express = require('express');
// body parser
var bodyParser = require('body-parser');

var $ = require('jQuery');

var app = express();

// json method
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')
app.set('views', './views')

var path = require('path');
app.use('/public',express.static(path.join(__dirname,'public')));
app.use( express.static( "public" ) );



app.get('/projects', function(req, res){

	res.render('projects',{});

})


app.get('/main', function(req, res){

	res.render('main',{});

})


app.get('/blog', function(req, res){

	res.render('blog',{});

})

app.post('/blog', function(req,res){
      //console.log('hi');
  pg.connect('postgres://postgres:123456@localhost:5432/blogcontent', function(err, client, done){
   client.query(`insert into blogcontent (title,body) values('${req.body.title}','${req.body.body}')`, function(err, result){
      //console.log(err);

      console.log(req.body.title);
      res.redirect('/blog');
    //res.render('display', { data: result.rows});
      done();
      pg.end();
    })
  })

})

app.get('/blogcontent', function(req, res){
  pg.connect('postgres://postgres:123456@localhost:5432/blogcontent', function(err, client, done){
   client.query('select * from blogcontent', function(err, result) {
      //res.redirect('/display');
      //res.redirect('/board');
      console.log(result.rows);
      res.render('blogcontent', { data: result.rows});


      done();
      pg.end();

  })
})
})


app.listen(3000, function(){
  console.log("Listening on port 3000")
})
