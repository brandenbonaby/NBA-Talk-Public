import express from 'express';
import  NbaClass  from './modules/NbaModule.js';
const nba = new NbaClass();
var teamReportRouter = express.Router()

/** myPostsRouter.get function to display team report page
 * @param {object} req -  user request object
 * @param {object} res -  response object used to return page to user
 * 
 * add results and username to the template and send user to the 
 * report page 
 */
teamReportRouter.get("/", async function(req, res)
{

  function createTeamReportPage(results)
  { 
    req.TPL.report = results;
    req.TPL.username = req.session.username;
    res.render("teamReport", req.TPL);
  }
  
  await nba.getTeamReport(req.session.team,createTeamReportPage);

});

export default teamReportRouter;
