// server.js

// BASE
// ============================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// NOHM CONFIGURATION FOR REDIS MAPPING
// ============================================

var nohm = require('nohm').Nohm;
var redis = require('redis').createClient();

nohm.setClient(redis);
nohm.setPrefix('teeder_status');

/**
def from_redis(number_of_updates)
  data = JSON.parse REDIS.get('hubot:storage')
  updates = data["_private"]["teeder_status"]
  updates.take(number_of_updates+1)
end

def updates(number_of_updates=5)
  JSON.generate from_redis(number_of_updates)
end
**/

//////redis.select(4); // or something?????????????????????????????????
Nohm.model('UserModel', {});
var user = Nohm.factory('UserModel');

//var User = nohm.model('User', {
  //  properties: {
//	name: {
//	    type: 'string',
//	    unique: true,
//	    validations: [
//		['notEmpty']
//	    ]
//	},

// ROUTES
// =============================================
var router = express.Router();              

// TEST ROUTE
router.get('/', function(req, res) {
    res.json({ message: 'API up' });
});

// REGISTER ROUTES
app.use('/api', router);

//SERVER START
// =============================================
app.listen(port);
console.log('connections via port ' + port);


