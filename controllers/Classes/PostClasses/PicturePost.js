import Post from './Post.js';
import path from "path";

export default class PicturePost extends Post {
    /** 
     * Create picture post variables
     * @constructor
     * @param {string}   username - username attached to the picture post
     * @param {string}   title - Title attached to the picture post
     * @param {object}   data - user data to be attached to a picture post
     * @param {string}   team - team attached to the picture post
     */ 
    constructor(username, title, data, team){
        super(username, title, data, team);
        this.expectedFileTypes = /jpeg|jpg|png|gif/;
     }

     /** 
     * confirm picture type is available and add to database
     * @param {string}   file - the file object uploaded by user
     * @param {object}   table - the table in the database
     * @param {string}   column - the column in picture table
     */
     checkExtensionAndAdd(file, table, column, returnCallback) {
        var extname = this.expectedFileTypes.test(path.extname(file.originalname).toLowerCase());
        var mimetype = this.expectedFileTypes.test(file.mimetype);
        if(mimetype && extname) {
            this.addToDatabase(table, column, returnCallback);
        } else {
            returnCallback({Error: 'Error: Images Only!'});
        }
    }
    
}
