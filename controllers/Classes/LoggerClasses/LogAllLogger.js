import fs from 'fs';
import  EventLogger from './EventLogger.js';
const Location = './storage/logs/log.txt';


/** 
 * Class that represents a basic logger 
 * @extends EventLogger
 */
export  class LogAllLogger extends EventLogger {
    /** 
     * log all requests to disk and whether it was permitted or denied
     * @param {object} req - user request object
     * @param {object} res - response object used to return page to user
     *  
     *  Append to the log location only
     */ 
    logToDisk(req,res,next) {
            var user;
            if (req.session.username === undefined || req.session.username === null)
                user = {userNotLoggedIn:"<------(NOT LOGGED IN) ----->"}
            else
                user = {LoggedInUser:req.session.username}
            
            if (req.session.accessDenied !== undefined && req.session.accessDenied !== null)
                user.access = "Access Denied";
            else
                user.access = "Access to page is permitted";
            
            var logList = [new Date(), req.path, req.ip, JSON.stringify(req.query),
                                JSON.stringify(req.body), JSON.stringify(user)]
            fs.appendFile(Location, "\n" + logList,
                (err) => {
                if (err) throw err;
                });
            if  (next == undefined || next === null) return;
            next();
     }
}
