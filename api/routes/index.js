var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//include config file. go up from routes and down into config.
var config = require('../config/config')
//set up the connection with options.
var connection = mysql.createConnection({
	host:config.host,
	user:config.user,
	password:config.password,
	database:config.database
})

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/productLine/get',(req,res)=>{
	var selectQuery = "SELECT * FROM Product"
	connection.query(selectQuery,(error,results)=>{
		if(error){
			res.json(error)
		}else{
			res.json(results);
		}
	})
})

module.exports = router;
