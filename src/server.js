require('dotenv').config();
var passport = require('passport');
var initializePassport = require('./passport-config');
var flash = require('express-flash');
var session = require('express-session');
var app = require('./app');
var port = process.env.PORT;
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var options = require('./api-docs');
var user = require('./controllers/user');
const jwt = require('jsonwebtoken');


// passport settings
initializePassport(
  passport,
  user.findByEmail,
  user.findById
);

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.post('/login', isAlreadyAuthenticated, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(403).json(err); }
    if (!user) { return res.status(401).json(info.message); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).send(token);
    });
  })(req, res, next);
});

app.delete('/logout', (req, res) => {
  // since we can't call delete from html
  // delete is not supported by the html forms. forms can only do post
  // so to be able to call delete we need another library called method-override
  req.logout();
  res.status(200).send('Logged Out!!!');
});

function isAuthenticated(req, res, next) {
  // check if it is authenticated or not.
  if (req.isAuthenticated()) {
      return next();
  } else {
      res.status(404).send('resource not authorized.');
  }
}

function isAlreadyAuthenticated(req, res, next) {
  // if they are already authenticated
  if (req.isAuthenticated()) {
      return res.redirect('/');
  } else {
      next();
  }
}

app.get('/', function (req, res) {
    res.sendFile( 'index.html', { root: __dirname });
});

var specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

console.log(`server is litening at port: ${port}`);
console.log(`please click here - http://localhost:${port}`);

app.listen(port);
