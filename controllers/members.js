import express from 'express';
import  {PostProxy} from './modules/NbaTalksModule.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

const __durname =  path.dirname(fileURLToPath(import.meta.url));
const membersRouter = express.Router();
const proxyPost = new PostProxy();
const  maxFileSize = 1000000;
/* use multer middleware to capture images */
const storage = multer.diskStorage({
    destination:  "storage/images",
    filename: function(req, file, cb){
          cb(null,file.fieldname + '-' + Date.now() + file.originalname);
          }
      });
/**
 * specifiy storage location for multer and specifiy
 * the max
 */
const fileUpload = multer({ 
  storage: storage,
  limits:{fileSize: maxFileSize}
});  

/** membersRouter.get function to display the team home page
 * @param {object} req -  user request object
 * @param {object} res -  response object used to return page to user
 * @async
 * 
 * Check if posts available for the requested team page, add the 
 * appropriate message to reflect this to the template. Along with
 * the username and the teams logo then send the user to the team
 * home page. 
 * 
 */membersRouter.get("/", async function(req, res)
{           
  var posts = await proxyPost.retrievePosts("team",req.session.team);
  if (posts.length > 0)
    req.TPL.posts = posts;
  else 
    req.TPL.noPosts = "No result yet :( but you can be the first! :)";
  
   if (req.session.message === undefined ) {
    req.TPL.message = "Upload a post!";
  } else {
    req.TPL.message = req.session.message;
    delete req.session.message;
  }
  req.TPL.username = req.session.username; 
  req.TPL.teamLogo = req.session.teamLogo; 
  
  res.render("members", req.TPL);
});

/** membersRouter.post function to upload a user post
 * @param {object} req -  user request object
 * @param {object} res -  response object used to return page to user
 * @param {string} data - name of element multer middleware will use to
 *                        get the value
 * 
 * Check type of upload and start post creation if type matches available 
 * types. Add a message to the cookie with the result of the upload and 
 * send redirect user back to the members page.
 * 
 */
membersRouter.post("/createPost", fileUpload.single('data'), function(req, res)
{
  var userData;
  
  function createMemberPage(result)
  {
    if (req.session.message === undefined && result === undefined)
      req.session.message = "Post successfully added!";
    else 
      req.session.message = "Error occurred, post upload unsuccessful, please try again"
      console.log(req.file);
    return res.redirect('back');
  }

  if (req.body.context === "picture" && req.file.size <= maxFileSize)
    userData = req.file;
  else if (req.body.context === "text")
    userData = req.body.data;
  else
    return createMemberPage('Error');
  
  proxyPost.createPost(req.session.username,req.body.title,
                        userData,req.session.team,req.body.context,
                        createMemberPage);
});

export default membersRouter;
