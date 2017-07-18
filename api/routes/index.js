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

// *****Product Route*************

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

router.get('/productline/:productLine/get', (req,res)=>{
	// res.json({msg:"test"})
	const pl =req.params.productLines;
	var plQuery = `SELECT  * FROM productLine
	INNER JOIN products ON productline.productLine = products.productLine
	WHERE link = ?`
	connection.query(plQuery,[pl], (error,results)=>{
		if (error) throw error;
		res.json(results);
	})
})

// **************Register******************
router.post('/register', (req, res)=>{
	console.log(req.body)

	const name = req.body.name;
	const email = req.body.email;
	const password = bcrypt.hashSync(req.body.password);
	const city = req.body.city;
	const state = req.body.state;
	const zipcode = req.body.zipcode

// First, check to see if email already exists
	const checkEmail = new Promise((resolve, reject) => {
		const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
		connection.query(checkEmailQuery,[email],(error,results)=>{
			if(error) throw error;
			if(results.length > 0){
				reject({msg: "userAlreadyExists"});
			}else{
				// we dont care about results. Just that there isn't a match
				resolve();
			}
		})
	})

	checkEmail.then(
		// Customers insert query
		()=>{
			var insertIntoCust = "INSERT INTO customers (customerName, customerEmail, customerPassword, customerCity, customerState, customerZipcode) VALUES (?,?,?,?,?,?)"
			// Run the query (for now autoset the sales rep to 1337)
			connection.query(insertIntoCust,[name,email,password,city,state,zipcode],(error, results)=>{
				// Get the ID that was used in the customers insert
				const newID = results.insertId
				// Get the current timestamp
				var currTimeStamp = parseInt(Date.now() / 1000);
				// Set up a token for this user. We will give this back to React
				// var token = randToken.uid(40);
				// Users insert query
				var insertQuery = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
				// Run the query. Use error2 and results2 because are already used results and error
				
				connection.query(insertQuery,[newID, accountType,password, currTimeStamp, token, email],(error2,results2)=>{
					if(error2){
						res.json({
							msg: error2
						})
					}else{
						res.json({
							msg: "userInserted",
							token: token,
							name: name
						});
					}
				});
			})
		}
	).catch(
		(error)=>{
			res.json(error)
		}
	)

})	

// **************Login*********************
router.post('/login', (req, res)=>{
	var email = req.body.email;
	var password = req.body.password;
	var checkLoginQuery = "SELECT * FROM users WHERE email = ?";
	connection.query(checkLoginQuery, [email], (error,results)=>{
		if(error) throw error;
		if(results.length === 0){
			// This email aint in the database
			res.json({
				msg: 'badUserName'
			});
		}else{
			// The username is valid. See if the password is...
			var checkHash = bcrypt.compareSync(password, results[0].password);
			// checkHash will be true or false.
			if(checkHash){
				// this is teh droid we're looking for
				// Log them in... i.e, create a token, update it, send it back
				const updateToken = `Update users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email =?`
				var token = randToken.uid(40);
				connection.query(updateToken,[token,email],(error2,results2)=>{
					res.json({
						msg: 'loginSuccess',
						name: results[0].name,
						token: token
					})
				})
			}else{
				// These arent the droids were looking for.
				// You don't want to sell me death sticks.
				// You want to go home and rethink your life. Goodbye
				res.json({
					msg: 'wrongPassword'
				})
			}
		}
	})
})

module.exports = router;

