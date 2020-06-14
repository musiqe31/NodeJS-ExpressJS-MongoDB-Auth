var express = require('express');
var router = express.Router();
const verify = require('./verifyToken')

/* GET users listing. */
router.get('/', verify, function(req, res, next) {
  res.json({posts:{title:"My First Post",
   description:"Random Information Thats Locked!", user:req.user}});

   //can gather user information such as User.findbyOne({_id:req.user})
});

module.exports = router;
