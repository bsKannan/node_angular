// var express = require('express');
// var router = express.Router();
// var User = require('../models/user');
// var jwt = require('jsonwebtoken');


// router.post('/register',(req,res,next)=>{
//   var user = new User({
//     email:req.body.email,
//     username: req.body.username,
//     password: User.hashPassword(req.body.password),
//     creation_dt: Date.now()
//   })
//   let promise = user.save()

//   promise.then((doc) =>{
//     return res.status(201).json(doc)
//   })

//   promise.catch((err)=> {
//     return res.status(501).json ({
//       message:'Error Registraction user'
//     })
//   })
// })

// router.post('/login',(req,res,next)=> {
//   let promise = User.findOne({email:req.body.email}).exec();

//   promise.then((doc) =>{
//     if(doc){
//       if(doc.isVailed(req.body.password)){
//         //Generate token
//         let token = jwt.sign({username:req.body.username},'secret',{expiresIn:'2h'});

//         return res.status(200).json(token);
//       }
//       else {
//         return res.status(501).json({
//           message: 'Invaild Creadentials'
//         })
//       }
//     }
//     else {
//       return res.status(501).json({
//         message:'User email is not registered.'
//       })
//     }
//   })
  
//   promise.catch((err)=>{
//     return res.status(501).json({
//       message:'some internal error'
//     })
//   })
// })

// router.get('/username',verifyToken,(req,res,next)=> {
//   return res.status
// })

// var decodedToken='';

// verifyToken((req,res,next) => {
//   var token = req.query.token;
  
//   jwt.verify(token,'secret',function(err,tokendata){
//     if(err){
//       return res.status(400).json({
//         message:'Unauthorized request'
//       })
//     }
//     if(tokendata){
//       decodedToken = tokendata;
//       next();
//     }
//   })
// })
// // /* GET users listing. */
// // router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });

// module.exports = router;



var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/register',  function(req,res,next){
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  let promise = user.save();

  promise.then(function(doc){
    return res.status(201).json(doc);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user.'})
  })
})

// router.post('/login', function(req,res,next){
//    let promise = User.findOne({email:req.body.email}).exec();

//    promise.then(function(doc){
//     if(doc) {
//       if(doc.isValid(req.body.password)){
//           // generate token
//           let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'});

//           return res.status(200).json(token);

//       } else {
//         return res.status(501).json({message:' Invalid Credentials'});
//       }
//     }
//     else {
//       return res.status(501).json({message:'User email is not registered.'})
//     }
//    });

//    promise.catch(function(err){
//      return res.status(501).json({message:'Some internal error'});
//    })
// })

router.post('/login', function(req,res,next){
  let promise = User.findOne({email:req.body.email}).exec();

  promise.then(function(doc){
   if(doc) {
     if(doc.isValid(req.body.password)){
         // generate token
         let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'});

         return res.status(200).json(token);

     } else {
       return res.status(501).json({message:' Invalid Credentials'});
     }
   }
   else {
     return res.status(501).json({message:'User email is not registered.'})
   }
  });

  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
})

router.get('/username', verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken.username);
})

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;