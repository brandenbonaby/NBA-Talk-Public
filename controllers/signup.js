import express from 'express';
import * as  NbaTalksModel from '../models/NbaTalksModel.js';
var signupRouter = express.Router()
import  bcrypt from 'bcrypt';

/** signupRouter.get function to display the signup page
 * @param {object} req - user request object
 * @param {object} res - response object used to return page to user
 * 
 * Check if there were errors previous to the call
 * and get the teams values from the database to send to 
 * the form. Change the template object depending 
 * on the existence of an error and send user to 
 * to the signup page together with the template.
 * 
 */
signupRouter.get("/", function(req, res)
{
  req.TPL.signup_error = req.session.signup_error;
  req.TPL.signup = true;
  if (req.session.signup_error){
	  req.TPL.errorTitle = req.session.errorTitle
	  req.TPL.signUptitle = ""
  }else{
		req.TPL.errorTitle =""
		req.TPL.signUptitle = "Great choice my friend!"
	} 
  req.session.signup_error = "";
  function sendTeams(teams) {
	req.TPL.teams = teams;
	res.render("signup", req.TPL);
  }
  NbaTalksModel.getAllTeams(sendTeams);
  
});

/** signupRouter.post function to allow users to signup
 * @param {object} req - user request object
 * @param {object} res - response object used to return page to user
 * 
 * Check if the user exists in the database and username/password
 * match criteria. If they don't we send the user an error message
 * . If everything is fine we hash the password and add
 * username/password combination into the database. Regardless of 
 * an error we update the template and redirect the user back to
 * the signup page with a message.
 * 
 */
signupRouter.post("/attemptsignup", function(req, res)
{ 
	function successfulSignup(){ 
	  req.TPL.signupSuccessful = true; 
	res.render("signup", req.TPL);
	}
	
	function signUpError (user) {
		req.session.errorTitle = "Oh no something went wrong!";
		if (user !== undefined) {
			req.session.signup_error = "Username is already in use! please choose a different one.";
		} else {
			req.session.signup_error = "Username/password error please try again!";
		}
		res.redirect("/signup");
	}

	function confirmExistence(user){
		if (user !== undefined || req.body.username.length < 1 || req.body.password.length < 8 || req.body.password !== req.body.confirmPassword) {
			return signUpError(user);
		}
		else {
			bcrypt.hash(req.body.password, 10, function (err, hash){
				NbaTalksModel.signUpUser(req.body.username,hash,req.body.team,successfulSignup);
			});
			
		}
	}
	NbaTalksModel.getUser(req.body.username, confirmExistence);
});

export default signupRouter;