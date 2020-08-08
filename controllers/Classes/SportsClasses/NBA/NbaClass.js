import  * as NbaTalksModel from '../../../../models/NbaTalksModel.js';
import httpsRequest from '../../../APIdirectory/httpsRequest.js';
import nbaAPIOject from '../../../APIdirectory/nbaAPI.js';
import SportsClass from '../SportsClass.js';

/** 
 * Class to create of a representation of the NBA
 * @extends SportsClass
 */
export default class NbaClass extends SportsClass {

    /** 
     * Construct URL path
     * @async
     * @param {string}   team - team to find in database
     * @param {string}   candidatePath - prefix URL path to team
     * @return {Promise<string>} full URL path to team
     */ 
    getTeamPath(team, candidatePath){
        return new Promise ((resolve) => {
            function returnResults(res){
                candidatePath += res[0].api_ID;
                resolve(candidatePath);
            }
            NbaTalksModel.getApiTeam(team,returnResults);
        })
    }
    
    /** 
     * get player report for specified team
     * @async
     * @param {string}   team - team to find in database
     * @param {function}   callback - callback function to be called
     * @return {Promise<Array>} Array with all players on NBA team
     * 
     * Only return players directly on NBA team, if player not in
     * the standard league (NBA), disregard them.
     * 
     */ 
    async getTeamReport(team,callback) {
        var ret = []
        nbaAPIOject.options.path = await this.getTeamPath(team, nbaAPIOject.playersTeamIdPath);
        var results =  await httpsRequest(nbaAPIOject.options, "")
        for (var res of results.api.players){
            if (res !== undefined && res !== null){
              if ("standard" in res.leagues){
                res.jersey = res.leagues.standard.jersey
                res.pos = res.leagues.standard.pos
                delete res.leagues
                ret.push( res)
              }
            }
        }
        callback(ret);
    }
} 
 
