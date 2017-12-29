var express=require('express');
var app=express();
var port=process.env.PORT||8080;
var mongoose=require('mongoose');
var passport=require('passport');
var flash=require('connect-flash');
var morgan=require('morgan');
var path=require('path');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var session=require('express-session');
var configDB=require('./config/database.js');

mongoose.connect(configDB.url);//connect to the database


//setup our express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.set('views', path.join(__dirname,'views'));
app.set('view engine');

//required for passport
app.use(session({secret:'ilovescotch'}));
app.use(passport.initialize());

app.use(passport.session());
app.use(flash());

//routes
require('./app/routes.js')(app,passport);
require('./config/passport')(passport); // pass passport for configuration

app.listen(port);
console.log("magic happens here on port "+port);