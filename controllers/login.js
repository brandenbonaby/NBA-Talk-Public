import express from 'express';
import * as  NbaTalksModel from '../models/NbaTalksModel.js';
var loginRouter = express.Router();
import  bcrypt from 'bcrypt';

/** loginRouter.get function to display login page
 * @param {object} req -  user request object
 * @param {object} res -  response object used to return page to user
 * 
 * if there was an error during a form submission, add error to the
 * template. Then send user back to the login page.
 */
loginRouter.get("/", function(req, res)
{
  // 
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  res.render("login", req.TPL);
});

/** loginRouter.post function to perform form validation
 * @param {object} req -  user request object
 * @param {object} res -  response object used to return page to user
 * 
 * if there was an error during a form submission, add error to the
 * template and redirect user back to the login page. If user exists
 * compare hash password in database and hash from form password
 * if the same  log user session variables and redirect to team home
 * page.
 */
loginRouter.post("/attemptlogin", function(req, res)
{
	function errorOccured () {
		req.session.login_error = "Invalid username and/or password!";
		res.redirect("/login");
	}

	function sendToUserHomePage (account){
		console.log(account[0].logo)
		req.session.teamLogo = account[0].logo;
		res.redirect("/members");
	}

	function prepareTeamLogo (account){
		req.session.username = req.body.username;
		req.session.role = account[0].role;
		req.session.team = account[0].team;
		NbaTalksModel.getTeamLogo(account[0].team,sendToUserHomePage);
	}
	function validateAccount(account){
		if (account === undefined || account.length == 0){
			return errorOccured ();
		}
		var passwordHash = account[0].password; 
		bcrypt.compare(req.body.password,passwordHash, function(err, ret) {
			if (ret){
				return prepareTeamLogo (account);
			  } else {
				return errorOccured ();
				}
		}); 
	}
	NbaTalksModel.loginUser(req.body.username,validateAccount);
});


/** loginRouter.get function to perform user logout
 * @param {object} req -  user request object
 * @param {object} res -  response object used to return page to user
 * 
 * remove user session variables and redirect user back to the home
 * page
 */
loginRouter.get("/logout", function(req, res)
{
  delete(req.session.username);
  delete(req.session.role);
  delete(req.session.team);
  res.redirect("/home");
});

export default loginRouter;