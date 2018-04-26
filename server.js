const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

/*app.use((req, res, next) =>{
    res.render('maintenance.hbs',{
      pageTitle: 'Maintenance page'
    });
});*/
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});
//register a handler using app.get   it set up a handler for an http get request
app.get('/', (req, res) => {
  //res.send('<h1>Hello express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home page',
    message: 'Welcome to my first nodejs website!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page'
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request'
  });
});
app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});
