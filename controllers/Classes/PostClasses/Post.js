import  * as NbaTalksModel from '../../../models/NbaTalksModel.js';
import PostCreation from './PostCreation.js';

/** 
 * Class to create of post object
 * @extends PostCreation
 */
export default class Post extends PostCreation {
    /** 
     * Create post variables
     * @constructor
     * @param {string}   username - username attached to post
     * @param {string}   title - Title attached to the post
     * @param {object}   data - user data to be attached to a post
     * @param {string}   team - team attached to the post
     */ 
    constructor(username, title, data, team){
        super();
        this.username = username;
        this.title = title;
        this.data = data;
        this.team = team;
        this.date = new Date().toISOString().replace('T', ' ').substr(0, 19);
    }
    
    /** 
     * Add a posts to the database
     * @param {string}   table - table in database
     * @param {string}   column - column in table
     * @param {function} callback - callback function
     */ 
    addToDatabase(table, column, callback) {
        NbaTalksModel.createPost(this.username, this.title, this.data, this.team, column,this.date, table, callback);
    }
    
    /** 
     * Get all posts based on the table, column and key
     * @param {string}   table - table in database
     * @param {string}   column - column in  table
     * @param {function} callback - callback function
     * @param {object}   JSON object with posts represented as values
     */ 
    getFromDatabase(table, column,  key, callback) {
        return NbaTalksModel.getAllPosts(table, column, key, callback);
    }

    /** 
     * Set post variables
     * @param {string}   username - username attached to post
     * @param {string}   title - Title attached to the post
     * @param {object}   data - user data to be attached to a post
     * @param {string}   team - team attached to the post
     */
    setPostVariables(username, title, data, team){
        this.username = username;
        this.title = title;
        this.data = data;
        this.team = team;
        this.date = new Date().toISOString().replace('T', ' ').substr(0, 19);
    }
}
