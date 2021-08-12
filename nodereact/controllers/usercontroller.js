var ObjectId = require('mongodb').ObjectID;

const bcrypt = require("bcrypt")

const saltRounds = 10;
var userModel = require('../models/usermodel')
var adsModel = require('../models/adsmodel')
var adminModel = require('../models/adminmodel')

exports.signup = function(req,res){ 
  var countValue = req.body;
  console.log(req.files[0].filename)
  console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
  userModel.findOne({email:countValue.email},function(err,user){
    console.log(user)
    if(user) return res.send({ auth : false, message :"Email Already Exits"});
  
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "firstname": countValue.fname, 
    "lastname": countValue.lname,
    "email":countValue.email, 
    "password":hash,
    "followers": [],
    "following":[],
    "isbanned": false,
    "propic":req.files[0].filename,
    "address": countValue.address,
    "favs": []
    


 
} 
console.log("HashedPwd: ", hash)
  userModel.create(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
    return res.send({ auth : true, message :"You are now a user please login"});
          
}); 
});
});

      
}
exports.signin = function(req,res){ 
  var countValue = req.body;
  console.log("U are ", countValue.email);
  
userModel.findOne({ email: countValue.email }, function(err, collection){
  if(err){
      console.log("Invalid User");
      return res.send({
        success: false,
        message: 'User not exists'
      });
  }else{
    
    if (collection!=null){
      console.log("User found");
      
      bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
        console.log(resi)
        
      if (resi === true){
        console.log("Correct details found");
        console.log(collection.firstname+ countValue.email+collection._id)
        if(collection.isbanned){
          return res.send({
            success: false,
            message: 'You are banned by Admin'
          });

        }
        return res.send({
          success: true,
          message: 'Correct Details',
          fname: collection.firstname,
          lname: collection.lastname,
          email: collection.email,
          id: collection._id,
          following: collection.following,
          type: "User",
          favs: collection.favs
        });
      }else{
        return res.send({
          success: false,
          message: 'Error: Email and Pass Dont Match'
        });
       
      }
    });
      
    }else{
      console.log("User not found");
      return res.send({
        success: false,
        message: 'Error: Incorrect User, Recheck Your Email'
      });
    }
  }
   
});
      
}
exports.updatesettings = function(req,res){ 
  var updatedprofile = req.body;
  console.log(req.files[0].filename)
  console.log("UP for update i recieved in nodejs (Backend)", updatedprofile)
  bcrypt.hash(updatedprofile.pass, saltRounds, async (err, hash) => {
    const query = {"email": updatedprofile.email}
    var data={
      "firstname":updatedprofile.fname,
      "lastname":updatedprofile.lname,
      "email":updatedprofile.nemail,
      "propic":req.files[0].filename,
      "address":updatedprofile.address,
      "password":hash,
    }
    const update = {
      "$set": data
    };
    userModel.findOneAndUpdate(query,update)
    return res.send({
      message: 'Profile updated Successfully'
    });

  
  

});

      
}
exports.getuserIDName = function(req,res){ 
  console.log(" profile email: ", req.body.email)
  userModel.findOne({"email": req.body.email}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

      
}
exports.getuserByEmail = function(req,res){ 
  console.log(req.params.email)
  userModel.findOne({"email": req.params.email}, function(err, details) {
    console.log("user details Found",details)
    res.json(details)
});

      
}
exports.getuserByID = function(req,res){ 
  
  let id = req.params.id;
  userModel.findOne({"_id": ObjectId(req.params.id)}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

      
}
exports.mycart = async function(req,res){ 
  
  let email = req.params.email;
  console.log(email)
  var onj=await userModel.findOne({"email": email}).populate('cart')
  res.json(onj.cart)


      
}
   
   
  function Unfollowing(Demail,Recieptemail) {
    userModel.findOne({"email": Demail}, function(err, creden) {
      console.log("creden Found",creden.following)
      var UD=creden.following
      const index = UD.indexOf(Recieptemail);
      if (index > -1) {
        UD.splice(index, 1);
      }
      console.log("updated following of logged "+UD)
      creden.following=UD
      return creden.save()
      
  });
  userModel.findOne({"email": Recieptemail}, function(err, creden) {
    console.log("creden Found",creden.followers)
    var UD=creden.followers
    const index = UD.indexOf(Demail);
    if (index > -1) {
      UD.splice(index, 1);
    }
    console.log("updated followers of profile "+UD)
    creden.followers=UD
    return creden.save()
    
  });
    
  }
  function Following(Pemail,LUemail2) {
    userModel.findOne({"email": Pemail}, function(err, creden) {
      console.log("followers Found",creden.followers)
      var UD=creden.followers
      UD.push(LUemail2)
      console.log("updated followers of po "+UD)
      creden.followers=UD
      return creden.save()
      
  });
  userModel.findOne({"email": LUemail2}, function(err, creden) {
    console.log("following Found",creden.following)
    var UD=creden.following
    UD.push(Pemail)
    console.log("updated following of lu "+UD)
    creden.following=UD
    return creden.save()
    
  });
  }
exports.handlefriendbutton = function(req,res){ 
  console.log(req.body)
  
  if(req.body.profilestatus==="Not Anything"){
    console.log("hey backend, you have add "+req.body.Pemail+" id to "+req.body.LUemail2+" Following List")
    console.log("hey backend, you have add "+req.body.LUemail2+" id to "+req.body.Pemail+" Followers List")
    Following(req.body.Pemail,req.body.LUemail2)
  }
  if(req.body.profilestatus==="Following"){
    console.log("hey backend, you have remove "+req.body.Pemail+" id from "+req.body.LUemail2+" Following ")
    console.log("hey backend, you have remove "+req.body.LUemail2+" id from "+req.body.Pemail+" Followers ")
    Unfollowing(req.body.LUemail2,req.body.Pemail)
  }
  return res.send({
    message: 'Successful'

  });
      
}
exports.getUsers = async function(req,res){ 
  const filter = {};
  const all = await userModel.find(filter);
  res.json(all)

      
}