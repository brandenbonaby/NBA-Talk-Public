/** 
 * Abstract Class to create of post object
 * 
 */
export default class SportsClass {
    /**
     * @constructor
     */
    constructor() {
        /* Prevent abstract class from instantiating */
        if (new.target === SportsClass)
            throw new Error("Abstract classes can't be instantiated.");
     }

    /**
     * get team report
     * @abstract
     */
    getTeamReport(callback) {
        throw new Error('getFromDatabase must be implemented!');
    }
}

