
/* 
 * The private repo on the internet uses a connection pool that accesses a
 * mysql database in the clever cloud. This sqlite database just uses a
 * local database (file) in the home directory, but I have left the skeleton
 * code (commented out) if you wish to use a cloud database. 
 * 
import  mysql from 'mysql';
const db = mysql.createPool({
  connectionLimit : 5,
  host: "<databebase hostname >",
  user: "<database username>",
  password: "<database password>",
  database: "<database name>"
});
 */
import  sqlite3 from 'sqlite3';
const db = new sqlite3.Database("nbaTalksDatabase.db");

/* 
 * Note table and column  should only be given by the application, not user specifed.
*/
function getAllPosts(table, column, key,callback)
{
  db.all("SELECT * FROM "  + table + " WHERE "  + column + "=(?) ORDER BY date COLLATE NOCASE DESC", [key],
  	     function(err,results) {
          callback(results); });
}

 
function getAllTeams(callback)
{
  db.all("SELECT  team_name FROM Teams", 
         function(err,results) { 
          callback(results);
           }); 
}
function getApiTeam(team,callback)
{
  db.get("SELECT  api_ID FROM Teams WHERE team_name=?",[team], 
         function(err,result) { 
            callback(result);
           }); 
}

function getTeamLogo(team,callback)
{
  db.get("SELECT  logo FROM Teams WHERE team_name=?",[team], 
         function(err,result) { 
            callback(result);
           }); 
}
/* 
 * Note TableName and column should only be given by the application, not user specifed.
*/
function createPost(username, title, data, team, column, date, TableName, callback)
{
  db.run("INSERT INTO " + TableName + " (username, title, " + column + ", team,  date)  VALUES (?,?,?,?,?)",
         [username, title, data,  team, date],
         function(err) {
           console.log(err)
           callback(); 
         });
}
 
function loginUser(username, callback){
	db.get("SELECT password,role,team FROM Users WHERE username=?", 
				[username],
				function(err,results){ 
          callback(results); });
}

function signUpUser(username, password, team,callback){
	db.run("INSERT INTO Users VALUES (?,?,?,?)", 
				[username,password, team, "member"],
				function(err){
          callback(); 
        });
}

function getAllUsers(callback)  
{   
    db.all("SELECT username FROM Users",
         function(err,results) { 
          callback(results); }); 
    
}             

function getUser(username,callback)  
{   
  db.get("SELECT username FROM Users WHERE username=?",username,
         function(err,results) { console.log(err);callback(results); });  
}  

export {createPost, loginUser, signUpUser, getAllUsers, 
                  getUser, getAllTeams, getAllPosts, getApiTeam,getTeamLogo};
         
