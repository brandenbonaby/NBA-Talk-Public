import   express from 'express';
var homeRouter = express.Router()

/** homeRouter.get function to display the home page 
 * @param {object} req -  user request object
 * @param {object} res -  response object used to return page to user
 */
homeRouter.get("/", function(req, res)
{
  res.render("home",req.TPL);
});

export default  homeRouter;
 