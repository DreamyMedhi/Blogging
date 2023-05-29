const Login=require('../models/login');
const express=require('express');
const router=express.Router();







// router.post('/',function(req, res) {
//     var email = req.body.user_id;
//     var password = req.body.password;
//     if (email != '' && password != '') {
//       Login.findOne({
//         email: email,
//         password: password
//       }, function(err, data) {
//         if (err) {
//           //res.status(500).send();
//           console.log('error');
//         } else if (!data) {
//           console.log('Incorrect User ID or Password');
//           return res.end();
//         } else {
//           res.render("confirm");
//         }
//       });
//     }
//     res.end();
//   });