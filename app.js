const express=require('express');
const app=express();
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { Pool } = require('pg')
const pool = new Pool({
	user:'postgres',
	database:'postgres',
	password:'sandeep02',
	port:5432,
	host:'localhost',
})
var i=1;
pool.connect((err,client,done)=>{
	if (err) throw err
    /*client.query('CREATE TABLE movies(id serial PRIMARY KEY,movie_name VARCHAR2(2000) UNIQUE NOT NULL,description VARCHAR2(2000) UNIQUE NOT NULL)',(error,result)=>{
		console.log("Table Created");
	})*/
    client.query("SELECT max(id) from movies",(error,result)=>{
        if(err) console.log(err);
		console.log(result.rows[0].max);
        i=(result.rows[0].max)+1;
        console.log(i);
    })
	const DB_PATH = "pool";

// CREATE A MOVIES ROUTE (GET)
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html')
})
app.get('/addmovie',(req,res)=>{
	let name = req.query.name
	let rating = req.query.rating
	let stm = `INSERT INTO movies VALUES ('${i}','${name}','${rating}')`
	client.query(stm,(err,result)=>{
		if (err) throw err
		console.log('successfully added')
	})
	res.send('Movie Successfully Added')
})
/*app.post('/addmovie',(req,res)=>{
	let name = req.body.name
	let rating = req.body.rating
	let stm = `INSERT INTO movies VALUES ('${i+1}','${name}','${rating}')`
	client.query(stm,(err,result)=>{
		if (err) throw err
		console.log('successfully added')
	})
	res.send('ok')
})*/
})
// START SERVER
app.listen(5000,()=>{
	console.log("server is running");
});