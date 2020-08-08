/** 
 * Abstract Class to create of post object
 */
export default class PostCreation {
    /**
     * Initialize post variables
     * @constructor
     * @param {string} username 
     * @param {string} title 
     * @param {string} data 
     * @param {string} team 
     */
    constructor(username, title, data, team) {
        /* Prevent abstract class from instantiating */
        if (new.target === PostCreation)
            throw new Error("Abstract classes can't be instantiated.");
     }
    /**
     * Add post to database
     * @abstract
     */
     addToDatabase() {
        throw new Error('addDataBase must be implemented!');
     }
    
    /**
     * get post from database
     * @abstract
     * @return {object}
     */
    getFromDatabase() {
    throw new Error('getFromDatabase must be implemented!');
    }
}

