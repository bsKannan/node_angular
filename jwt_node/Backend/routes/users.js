var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/register',(req,res,next)=>{
  var user = new User({
    email:req.body.email,
    username: req.body.username,
    creating_dt: Date.now()
  })
  let promise = user.save()

  promise.then((doc) =>{
    return res.status(201).json(doc)
  })

  promise.catch((err)=> {
    return res.status(501).json ({
      message:'Error Registraction user'
    })
  })
})



// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
