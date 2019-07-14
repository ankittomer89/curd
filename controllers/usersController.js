const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var router = express.Router();
const Users = mongoose.model('Users');
const Roles = mongoose.model('Roles');
const db = require('../models/db')

router.get('/',(req,res)=>{
    res.render('users/addOrEdit',{
        viewTitle: "Insert User"
    });
});

router.post('/',(req,res)=>{
    if(req.body.id==''){
        insertRecordUsers(req,res);
    }
    else{
        updateRecord(req, res)
    }
});

function insertRecordUsers(req, res){

    var users = new Users();
    var roles = new Roles();
    var roleId;
    var {fullName,email,mobile,city,rolesName,} = req.body;
    users.fullName =fullName;
    users.email = email;
    users.mobile = mobile;
    users.city = city;
    roles.rolesName = rolesName;
    
    switch(roles.rolesName) {
        case 'Senior-Project-Manager':
           roleId = 1;
          break;
        case 'Project-Manager':
                 roleId = 2;
          break;
        case 'Manager':
                 roleId = 3;
          break;
          case 'Senior-Team-Member':
                 roleId = 4;
          break;
          case 'Technology-Analyst':
                 roleId = 5;
          break;
          case 'Software-Engineer':
                 roleId = 6;
                break;
        default:
                 roleId = 0;
      }
    users.rolesId = roleId;
    users.save((err,doc) => {
        if(!err){
            roles.rolesId = roleId;
            roles.userId = users._id;
            roles.save((err,doc) => {
                if(!err){
                    res.redirect('users/list');
                }
                else{
                    if(err.name == "ValidationError"){
                        handleValidationError(err, req.body);
                        res.render('users/addOrEdit',{
                            viewTitle: "Insert Users1",
                            roles: req.body
                        });
                    }
                    console.log('Error in insertion', err);
                }
            }); 
        }
        else{
            if(err.name == "ValidationError"){
                handleValidationError(err, req.body);
                res.render('users/addOrEdit',{
                    viewTitle: "Insert Users",
                    users: req.body
                });
            }
            console.log('Error in insertion', err);
        }
    });
}


function updateRecord(req, res){
    Users.findOneAndUpdate({_id: req.body.id}, req.body, {new: true} ,(err, doc)=>{
        if(!err){
            res.redirect('users/list');
        }
        else{
            if(err.name == 'validationErrror'){
                handleValidationError(err, req.body);
                res.render('users/addOrEdit',{
                    viewTitle:'Update User',
                    users: req.body
                })
            }
            else{
                console.log('Error in Updation', err)
            }
        }
    })
}

router.get('/list', (req, res)=>{
    Roles.aggregate([{
        $lookup:
            {
                from: 'users',
                localField: "rolesId",
                foreignField: "rolesId",
                as: "userId"
            }
        }],(err, docs)=>{
            var oldDoc = docs;
            var dataArr =[];
            rolesName = '';
            var arrData = '';
            var arrFnl = [];
            dataArr = [rolesName]
            oldDoc.forEach(function (data) {
               // console.log('===========================>>>>>>>>>>>>>>>>>>>>>>>>',data)
                data.userId[0].rolesName = data.rolesName;
                data.userId[0].userId = data._id;
                dataArr.push(data.userId)
            })
            if(!err){
                dataArr.shift();
                dataArr.forEach(function (arrData) {
                    arrData.forEach(function (a) {
                        arrFnl.push(a)    
                    })
                })
              // console.log('===========================>>>>>>>>>>>>>>>>>>>>>>>>',arrFnl)
                res.render('users/list',{
                    list:arrFnl
                });
            }
            else{
                console.log('Error in retriving users data', err)
            }
                    
        })
})

router.get('/:id', (req, res)=>{
    Users.findById(req.params.id, (err, doc)=>{
            if(!err){
                res.render('users/addOrEdit',{
                    viewTitle:"Update User",
                    users: doc    
                })
            }
    })
})

function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
            break;
            case 'email':
                    body['emailError'] = err.errors[field].message;
            break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
            break;
            case 'city':
                    body['cityError'] = err.errors[field].message;
            default:
                break;
        }
    }
}

router.get('/delete/:id', (req,res)=>{
  //  console.log('=====================>',req.params.id)
    // Users.findByIdAndRemove(req.params.id, (err,doc)=>{
    //     if(!err){
    //         res.redirect('/users/list')
    //     }
    //     else{
    //         console.log('Eroor in Delete',err)
    //     }
    // })
    Users.findById(req.params.id, (err, doc)=>{
        console.log('===================================>>>',doc)
    })
    Roles.findByuserId(req.params.id, (err, doc)=>{
        console.log('===================================>>>',doc)
    })


    // Roles.findByIdAndRemove(req.params.id, (err,doc)=>{
    //         if(!err){
    //             res.redirect('/users/list')
    //         }
    //         else{
    //             console.log('Eroor in Delete',err)
    //         }
    //     })
    

})

module.exports = router;
