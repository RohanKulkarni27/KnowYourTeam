const express = require('express');

const app = express();
const mysql = require('mysql');


//For getting season year
app.get("/",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b545f7524db1bb',
        password:'49febacd',
        database:'heroku_cbe73ef21bf91e8'
    })
   
  
    const query = "SELECT DISTINCT(season) from stats";
   // const query = "Select * from users where FirstName='"+name+"'";
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});




//For getting all the teams played in that particular year
app.get("/:season",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b545f7524db1bb',
        password:'49febacd',
        database:'heroku_cbe73ef21bf91e8'
    })
   
    const season=req.params.season;
    const query = "Select DISTINCT(home_team) from stats where season='"+season+"'";
   // const query = "Select * from users where FirstName='"+name+"'";
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});


//For getting home goals of the specific team at specific year
app.get("/:season/:team",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b545f7524db1bb',
        password:'49febacd',
        database:'heroku_cbe73ef21bf91e8'
    })
   
    const season=req.params.season;
    const team=req.params.team
    const query = "select SUM(home_goals) as HomeGoals,SUM(away_goals) as AwayGoals from stats where home_team='"+team+"' and season='"+season+"'";
   // const query = "Select * from users where FirstName='"+name+"'";
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});


//For getting number of wins,draw,loses.
app.get("/:season/:hometeam/:awayteam",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b545f7524db1bb',
        password:'49febacd',
        database:'heroku_cbe73ef21bf91e8'
    })
   
    const season=req.params.season;
    const hometeam=req.params.hometeam;
    const awayteam=req.params.awayteam;
    var query='';
   // const query = "select SUM(home_goals) as HomeGoals,SUM(away_goals) as AwayGoals from stats where home_team='"+team+"' and season='"+season+"'";
   // const query = "Select * from users where FirstName='"+name+"'";

   query = query+"select ";
   query=query+"COUNT( ";
   query=query+"CASE ";
   query=query+"WHEN result='D' ";
   query=query+"THEN 1 ";
   query=query+"ELSE NULL ";
   query=query+"END "
   query=query+") AS 'Draw', ";
   query=query+"COUNT( ";
   query=query+"CASE ";
   query=query+"WHEN result='H' ";
   query=query+"THEN 1 ";
   query=query+"ELSE NULL ";
   query=query+"END "
   query=query+") AS 'Win', ";
   query=query+"COUNT( ";
   query=query+"CASE ";
   query=query+"WHEN result='A' ";
   query=query+"THEN 1 ";
   query=query+"ELSE NULL ";
   query=query+"END "
   query=query+") AS 'Lost' ";
   query=query+"from stats ";
   query=query+"where (home_team='"+hometeam+"' or away_team='"+awayteam+"') and season='"+season+"'";
   console.log(query);
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});



const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server is up and listening at "+PORT);
})