import  mysql from 'mysql';

/* create connection pool for database connections */
const db = mysql.createPool({
  connectionLimit : 5,
  host: "<add host  here>",
  user: "<add user here>",
  password: "<add password here>",
  database: "<add database here>"
});

function getAllPosts(table, column, key,callback)
{
  db.query("SELECT * FROM ?? WHERE ??=(?) ORDER BY ?? DESC", [table, column, key,"date"],
  	     function(err,results) {
          callback(results); });
}

 
function getAllTeams(callback)
{
  db.query("SELECT  team_name FROM Teams", 
         function(err,results) { 
          callback(results);
           }); 
}
function getApiTeam(team,callback)
{
  db.query("SELECT  api_ID FROM Teams WHERE team_name=?",[team], 
         function(err,result) { 
            callback(result);
           }); 
}

function getTeamLogo(team,callback)
{
  db.query("SELECT  logo FROM Teams WHERE team_name=?",[team], 
         function(err,result) { 
           console.log(result)
            callback(result);
           }); 
}

function createPost(username, title, data, team, column, date, context, callback)
{
  db.query("INSERT INTO ??  (username, title, ??, team,  date) VALUES (?,?,?,?,?)",
         [context,column,username, title, data,  team, date],
         function(err,results) {
           callback(); 
         });
}
 
function loginUser(username, callback){
	db.query("SELECT password,role,team FROM Users WHERE username=?", 
				[username],
				function(err,results){ 
          callback(results); });
}

function signUpUser(username, password, team,callback){
	db.query("INSERT INTO Users (username, password, team, role) VALUES (?,?,?,?)", 
				[username,password, team, "member"],
				function(err,results){ callback(); });
}

function getAllUsers(callback)  
{   
    db.query("SELECT username FROM Users",
         function(err,results) { 
          callback(results); });
    
}             

function getUser(username,callback)  
{   
  db.query("SELECT username FROM Users WHERE username=?",username,
         function(err,results) { callback(results); });  
}  

export {createPost, loginUser, signUpUser, getAllUsers, 
                  getUser, getAllTeams, getAllPosts, getApiTeam,getTeamLogo};
         
