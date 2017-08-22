// ========== Define packages ==========

const express = require('express');
const expressMustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// ========== Define templates ==========
app.engine('mustache-express', expressMustache());
app.set('views', './views');
app.set('view engine', 'mustache-express');

// ========== code for express-session ==========

app.use(
  session({
    secret: 'seeecret', // this is a password. it is hard coded. in the future this is not how to store passwords.
    resave: false, // since false, this does not save without changes
    saveUninitialized: true // creates a session
  })
);


//for body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// path to index
app.get('./views', function(req, res) {
  // res.sender("Hello!!!!!!"); displays "Hello!!!!!!" on the / page.
  if (!req.session.loginID) {
    res.redirect('login')
  } else {
    res.render('index', {
      username: req.session.loginID
    });
  }
});

// path to login
app.get('./views', function(req, res) {
  res.render('login')
});


// ========== make express listen on port 3000 ==========
app.listen(3000, function() {
  // feedback. Is the apprunning?
  console.log("The app is running");
});
