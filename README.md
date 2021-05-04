# NBA-Talk-Public

Instruction's below are for how to run the website locally. But As of now Aug - 2020 the website is up and running, as my proof of concept (likely to change in the future).

Here is a link for the architectural documentation I created for the website. you might want to download it so that you can zoom in and out using Adobe reader.
https://drive.google.com/file/d/1l3ZlZnSpUjGM8ejPW13N6t33S5HAzdhZ/view?usp=sharing

The application is written in Node Js (v14.6.0) using es6 functionalities. So most likely to run it you will need to add  "type": "module" to your package.json file and use node version 12 or above. Should you choose not to use the package.json file provided at least.

Required: package.JSON file for dependencies


To run it locally you also need to provide an API key in the nbaAPI.js file. I have provided this for you. The private repository uses a cloud mysql database with a connection pool but in this public repository I have implemented the database using sqlite3. This should allow you to quickly clone this repository and spin up the website, without having to worry about that stuff. If you're interested you can get a new nba api key here https://rapidapi.com/api-sports/api/api-nba and use your own. For the private repository I used https://www.clever-cloud.com/en/ (if you wanted to know at least).

That ends the prerequisites:

next you can simply run the following to start the website:

**node app.js** or **nodemon app.js** which ever one you like to use more.

the website will be located at: http://localhost:8081/
