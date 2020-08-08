import express from 'express';
import fs from 'fs';
import session from 'express-session';
import mustacheExpress from 'mustache-express';
import { fileURLToPath } from 'url';
import path from 'path';
import homeRouter from  "./controllers/home.js";
import membersRouter from  "./controllers/members.js";
import teamReportRouter from  "./controllers/teamReport.js";
import loginRouter from  "./controllers/login.js";
import signupRouter from  "./controllers/signup.js";
import myPostsRouter from  "./controllers/myPosts.js";
import  { LogAllLogger } from './controllers/modules/NbaTalksModule.js';
const app = express();
app.set('port',(process.env.PORT || 8081));
const __durname =  path.dirname(fileURLToPath(import.meta.url));
const secret = "c:d${v~mM5w&Y/$<jwuxAj<UTacbn`nU*9MSy8>xCUbjZV}?w&5Xq&.Eud~TnDzP%f{*^Z}@fmx/JwMhnsA`)U-%c_%d!*?xF%8<N%29}m5FjR~FS!p3wtHY}WwsQ"
const logger = new LogAllLogger();

/* use mustache templating engine */
app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __durname + '/views');

/* process form data in the body */
app.use(express.urlencoded({extended: false}));

/* create user session , with session middlewear */
app.use(session({secret: secret
                ,resave: false
                ,saveUninitialized:false}))

/* populate template to be used with mustache*/
app.use(function(req,res,next) {

  req.TPL = {};
  req.TPL.displaylogin = !req.session.username;
  req.TPL.displaylogout = req.session.username;
  req.TPL.team = req.session.team;

  next();
});

/* default storage location for files sent to user */
app.use(express.static(__durname + "/storage/images"));

/*protected page, if not valid user, log and redirect to home page */ 
app.use("/members", function(req,res,next) {

  if (req.session.username) {
    next();
  }else {
    req.session.accessDenied = true;
    logger.logToDisk(req,res,null);
    res.redirect(302,"/home");
  }

});

/*protected page, if not valid user, log and redirect to home page */
app.use("/myPosts", function(req,res,next) {

  if (req.session.username) {
    next();
  } else { 
    req.session.accessDenied = true;
    logger.logToDisk(req,res,null);
    res.redirect(302,"/home");
  }

});

/*protected page, if not valid user, log and redirect to home page */
app.use("/teamReport", function(req,res,next) {
  if (req.session.username && req.session.team) {
    next();
  } else {
    req.session.accessDenied = true;
    logger.logToDisk(req,res,null);
    res.redirect(302,"/home");
  }

});

/* logger to log all requests to disk */
app.use(logger.logToDisk);

/* controller routes */
app.use("/home", homeRouter);
app.use("/members", membersRouter);
app.use("/teamReport", teamReportRouter);
app.use("/login", loginRouter);
app.use("/myPosts", myPostsRouter);
app.use("/signup", signupRouter);
app.use("/signup/attemptsignup", signupRouter);

/*the root page redirects to the home page */
app.get("/", function(req, res) {
  res.redirect("/home");
});

/* base case if user attempts to go to a webpage not available */
app.get(/^(.+)$/, function(req,res) {
  res.sendFile(__durname + req.params[0]);
});

/* Initialize the server */
const server = app.listen(app.get('port'), function() {console.log("NBA TALKS IN ONLINE...");})
