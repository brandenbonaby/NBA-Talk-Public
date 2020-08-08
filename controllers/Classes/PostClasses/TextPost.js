import Post from './Post.js';

/** 
 * Class to create of a text post object
 * @extends Post
 */
export default class TextPost extends Post {
    /** 
     * Create text post variables
     * @constructor
     * @param {string}   username - username attached to the text post
     * @param {string}   title - Title attached to the text post
     * @param {object}   data - user data to be attached to a text post
     * @param {string}   team - team attached to the text post
     */ 
    constructor(username, title, data, team){
        super(username, title, data, team); 
    }
    
}
