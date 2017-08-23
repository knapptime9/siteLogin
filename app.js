// ========== Define packages ==========

const express = require('express');
const expressMustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.engine('mustache', expressMustache());
app.set('views', './views');
app.set('view engine', 'mustache');

// ========== code for express-session ==========
//for body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(
  session({
    secret: 'seeecret', // this is a password. it is hard coded. in the future this is not how to store passwords.
    resave: false, // since false, this does not save without changes
    saveUninitialized: true // creates a session
  })
);



// app.get('/',function(req, res) {
//   res.render('index');
// });



  // path to index
  app.get('/', function(req, res) {
  if (!req.session.authorized) {
    res.redirect('/login')
  } else {
    res.render('index'), {
    };
  }
});
// path to login
app.get('/login', function(req, res) {
  res.render('login')
});

app.post('/login', function(req, res){
  var loginID = req.body.loginID
  req.session.loginID = loginID
  req.session.authorized = true
  res.redirect('/')
  // console.log(req.session)
  // console.log(req.body.loginID)
  // console.log(req.session.loginID)
  // console.log(loginID)
})



// ========== make express listen on port 3000 ==========
app.listen(3000, function() {
  // feedback. Is the apprunning?
  console.log("The app is running");
});
