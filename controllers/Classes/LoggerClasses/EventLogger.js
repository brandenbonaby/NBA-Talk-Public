export default class EventLogger {
    
    /**
     * log event to the harddisk
     * @abstract
     */
    logToDisk() {
        throw new Error('addDataBase must be implemented!');
     }

}

