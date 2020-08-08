import express from 'express';
import  {PostProxy} from './modules/NbaTalksModule.js';
const myPostsRouter = express.Router()
const proxyPost = new PostProxy();

/** myPostsRouter.get function to display page with all user posts
 * @param {object} req -  user request object
 * @param {object} res -  response object used to return page to user
 * @async
 * 
 * Check if posts available for the requested user, add the 
 * appropriate message to reflect this to the template. Along with
 * the username and then send the user to the myPosts page
 * 
 */
myPostsRouter.get("/", async function(req, res)
{ 
    var posts = await proxyPost.retrievePosts("Username",req.session.username);

    if (posts.length > 0)
      req.TPL.posts = posts;
    else 
      req.TPL.noPosts = "You have no posts yet";
    req.TPL.username = req.session.username; 
    res.render("myPosts", req.TPL);
});

export default myPostsRouter;
