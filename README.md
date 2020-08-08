# NBA-Talk-Public
Public code for my project website

The application is written in Node Js (v14.6.0) using es6 functionalities. So most likely to run it you will need to add  "type": "module" to your package.json file and use node version 12 or above. Should you choose not to use the package.json file provided.

Required Node dependencies to be installed with npm:
- "bcrypt": "^5.0.0",
- "express": "^4.17.1",
- "express-mustache": "^1.0.4",
- "express-session": "^1.17.0",
- "fs-extra": "^9.0.1",
- "moment": "^2.27.0",
- "multer": "^1.4.2",
- "mustache-express": "^1.2.8",
- "mysql": "^2.18.1",


To run it locally you also need to provide an API key in the nbaAPI.js file. If I haven't provided you one you can get a free one at https://rapidapi.com/api-sports/api/api-nba
You also need to provide a hostname, username, password and database for the mySQL pool in NbaTalksModel.js. I used https://www.clever-cloud.com/en/ to get a mySql database running in the cloud.

That ends the prerequisites:

next you can simply run the following to start the website:

node app.js

the website will be located at: http://localhost:8080/
