import TextPost from './TextPost.js';
import PicturePost from './PicturePost.js'; 
import  moment from 'moment';

/** Proxy post class that acts like a Post class */
export class PostProxy {
    /** 
     * Create post types
     * @constructor
     */ 
    constructor(){
        this.picPost = new PicturePost("","","","");
        this.texPost = new TextPost("","","","");
     }                               
     
    /** 
     * Create a post depending on the context
     * @param {string}   username - username attached to post
     * @param {string}   title - Title attached to the post
     * @param {object}   data - user data object to attach to post
     * @param {string}   team - team attached to the post
     * @param {string}   context - the type of post it should be
     * @param {function} callback - callback function
     */ 
    createPost(username, title, data, team, context, callback){
        if (context === "text") {
            this.texPost.setPostVariables(username, title, data, team);
            this.texPost.addToDatabase("Text_Posts", "text", callback);
        } else if (context === "picture") {
            this.picPost.setPostVariables(username, title, data.path, team);
            this.picPost.checkExtensionAndAdd(data, "Picture_Posts", "location" , callback);
        }
    }

    /** 
     * get all picture posts based on the  column and key
     * @async
     * @param {string}   column - column in picture table
     * @param {string}   key - the value in the table we want
     *                            all posts to belong to
     * @param {object}   instance - the calling functions 'This' object
     * @return {Promise<JSON>} All picture posts associated with key.
     */ 
    getPicturePosts(column,key,instance){
        return new Promise (resolve => {
            function setResults(res){
                resolve(res);
            }
            instance.picPost.getFromDatabase("Picture_Posts", column, key, setResults);
        });    
    }

    /** 
     * get all text posts based on the  column and key
     * @async
     * @param {string}   column - column in picture table
     * @param {string}   key - the value in the table we want
     *                            all posts to belong to
     * @param {object}   instance - the calling functions 'This' object
     * @return {Promise<JSON>} All text posts associated with key.
     */ 
    getTextPosts(column,key,instance){
        return new Promise (resolve => {
            function setResults(res){
                resolve(res);
            }
            instance.texPost.getFromDatabase("Text_Posts", column, key, setResults)
            
        });
    }

    /** 
     * check if object is empty
     * @param  {object}  obj - JSON object
     * @return {boolean} The result of the check
     */ 
    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    /** 
     * Merge value from a JSON object into an array of seperate values
     * @param  {array}   posts - array containing values 
     * @param  {object}  results - JSON object
     * @return {array} The new array of values
     */ 
    addKeysToArray( posts, results) {
        if (results !== undefined  && !this.isEmpty(results)){
        Object.keys(results).forEach(key => posts.push(results[key]));
        }
        return posts
    }

    /** 
     * Get all text posts based on the  column and key and then
     * sort them in descending order using moments to show how 
     * long ago they were uploaded.
     * @async
     * @param   {string}   column - column in picture table
     * @param   {string}   key - the value in the table we want
     * @return {Promise<Array>} All picture and text posts associated with key.
    */ 
    async retrievePosts(column,key){
        var posts = [];
        var results = [this.getTextPosts, this.getPicturePosts];
        var resultsLength = results.length;
        for (var i = 0; i < resultsLength; i++){
            var result = await results.pop()(column,key,this);
            posts = this.addKeysToArray( posts,result);
        }
        
        if (posts.length > 0) {
            posts = posts.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            posts.map(function (res){ 
                res.date = moment.utc(res.date,'YY-MM-DD hh:mm:ss A').fromNow();
                return res; 
            });
        }
        return posts;
    }
}
