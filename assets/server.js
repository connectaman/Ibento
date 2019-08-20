let express = require('express');
let http=require('http');
let app= express();
let mongoose=require('mongoose');
let nodemailer = require('nodemailer');
require('dotenv').config();
let bodyParser = require('body-parser');
let bp=bodyParser.json();
let session = require('express-session');
const Nexmo = require('nexmo');

//Cros 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(session({secret: "Shh,its a secret!"}));
// Starting the server at port
app.listen("3000",()=>{
    console.log("Server started at port 3000 ! ");
});
// Setting up the nodemailer transport service
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user:process.env.USERNAME, 
        pass:process.env.PASS 
    }
  });
// Connect to the Mlab database
mongoose.connect('mongodb://admin:admin123@ds139890.mlab.com:39890/ibento');
// Signup Form Scheme 
let RegisterSchema = new mongoose.Schema({
    "_id": String,
    "Name": String,
    "dob": String,
    "Password": String,
    "Gender":String,
    "Phone": Number,
    "City":String,
    "State":String
});
// Hosting Event Schema
let HostSchema = new mongoose.Schema({
            "name":String,
            "designation":String,
            "email":String,
            "phone":Number,
            "address":String,
            "city":String,
            "pin":Number,
            "eventname":String,
            "eventtype":String,
            "startdate":String,
            "enddate":String,
            "contract":String,
            "eventcity":String,
            "image":String,
            "video":String,
            "map":String,
            "description":String
});
// Review Schema
let ReviewSchema = new mongoose.Schema({
            "EventName":String,
            "EventType":String,
            "Image":String,
            "video":String,
            "Review":String
});
// Equipment Rental Schema
let EquipmentSchema = new mongoose.Schema({
            "Name":String,
            "Email":String,
            "Phone":Number,
            "Address":String,
            "City":String,
            "PinCode":Number,
            "Items":String,
            "StartDate":String,
            "EndDate":String,
            "Review":String
});
// venue Rental Schema
let VenueSchema = new mongoose.Schema({
  "Name":String,
  "Designation":String,
  "Email":String,
  "Phone":Number,
  "Address":String,
  "City":String,
  "PinCode":Number,
  "Halls":String,
  "Size":String,
  "EventType":String,
  "Cost":Number,
  "Attendees":Number,
  "Contract":String,
  "Image":String,
  "Description":String
});
// Creating Register Database 
let RegisterModel = new mongoose.model("register",RegisterSchema);
// Creating HostEvent Database 
let HostModel = new mongoose.model("HostEvent",HostSchema);
// Creating a Review Database
let ReviewModel = new mongoose.model("Review",ReviewSchema);
// Creating Equipment Rental DataBase
let EquipmentModel = new mongoose.model("Equipment",EquipmentSchema);
// Creating Venue Rental Database
let VenueModel = new mongoose.model('Venue',VenueSchema);
// Retriving data from Register Database
app.post("/login",bp,function(req,res){
  req.session.email = req.body.UserEmail;
  console.log(req.session.email);
    RegisterModel.find({"_id":req.body.UserEmail,"Password":req.body.UserPassword},function(err,data){
        if(data.length == 0)
        {
            console.log("invalid");
            let data = {
                "msg":"invalid"
            };
            res.json(data);
        }
        else
        {
          // console.log(data);
          res.json(data);
          app.post("/profile",bp,function(req,res){
              console.log(data);
                res.json(data);
          });
         
        }
    });
  });
app.post("/updateprofile",bp,function(req,res){
  console.log(req.body);
  RegisterModel.findOneAndUpdate({"_id":req.body._id},{$set:{"Name":req.body.Name,"dob":req.body.dob,"Phone":req.body.Phone,"City":req.body.City,"State":req.body.State}},function(err,status){
    if(err)
    {
      console.log(err);
      let data = {
        msg:"error"
      }
      res.json(data);
    }
    if(status){
      console.log(status);
      let data = {
        msg:"updated"
      }
      res.json(data);
    }
  });
});
app.post("/searchevent",bp,function(req,res){
  console.log(req.body.EventName);
  var query = req.body.EventName;
  HostModel.find({"eventname":{$regex:query,$options: 'i'}},function(err,data){
    if(err)
    {
      console.log(err);
      var data={
        msg:"no data Found"
      };
      res.json(data);
    }
    if(data)
    {
      res.json(data);
      console.log(data);
      app.post("/searchdata",bp,function(req,res){
        res.json(data);
        console.log(data);
      });
      // console.log(data);
    }
  });
});
app.get("/hostevent",bp,function(req,res){
    console.log(req.body);
    HostModel.find({},function(err,data){
        res.json(data);
    });
});
app.get("/corporate",bp,function(req,res){
  console.log(req.body);
  HostModel.find({"eventtype":"Corporate"},function(err,data){
      res.json(data);
  });
});
app.get("/conference",bp,function(req,res){
  console.log(req.body);
  HostModel.find({"eventtype":"Conference"},function(err,data){
      res.json(data);
  });
});
app.get("/seminar",bp,function(req,res){
  console.log(req.body);
  HostModel.find({"eventtype":"Seminar"},function(err,data){
      res.json(data);
  });
});
app.get("/exhibition",bp,function(req,res){
  HostModel.find({"eventtype":"Exhibition"},function(err,data){
    res.json(data);
  });
});
app.post("/searchevent",bp,function(req,res){
    console.log(req.body.val);
    app.get("/event",function(req,res)
    {
        HostModel.find({"eventtype":req.body.val},function(err,data){
            res.json(data);
        });
    });
});
// Retriving the Reviews from the database
app.get("/reviews",function(req,res){
    ReviewModel.find({},function(err,data){
        res.json(data);
    });
});
app.get("/getvenue",function(req,res){
  VenueModel.find({},function(err,data){
      res.json(data);
  });
});
app.get("/getequipment",function(req,res){
  EquipmentModel.find({},function(err,data){
      res.json(data);
  });
});
app.get("/eventdelete/:name",function(req,res){
  var event = req.params.name;
  HostModel.remove({"name":event},function(err,data){
      if(data)
      {
        alert("deleted");
      }
  });
});
app.get("/reviewdelete/:name",function(req,res){
  var event = req.params.name;
  ReviewModel.remove({"EventName":event},function(err,data){
      if(data)
      {
        console.log("Deleted");
      }
  });
});
app.get("/equipmentdelete/:name",function(req,res){
  var event = req.params.name;
  EquipmentModel.remove({"Name":event},function(err,data){
      if(data)
      {
        console.log("Deleted");
      }
  });
});
// Sending Data to Register Database
app.post("/register",bp,function(req,res){
    console.log(req.body);
    let email = req.body._id;
    const phoneNumber = req.body.Phone;
    const message = "Thank You to Register on Ibento. Enjoy using the services on our website";
    const messageType = "ARN";
    RegisterModel(req.body).save(function(err,data){
        if(err)
        {
            let data={
              msg:"duplicate"
            };
            res.json(data);
        }
        else{
          let data={
            msg:"success"
          };
          res.json(data);
          nexmo.message.sendSms(
            '918147066971', '918147066971', 'hello',
              (err, responseData) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("sent");
                  console.dir(responseData);
                }
              }
           );
          
            let mailOptions = {
                from: 'Ibento <info@ibento.com>',
                to:email,
                subject: 'Ibento | New User',
                text: `Welcome to Ibento thanks for joining`
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error); 
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });  
        }
    });
});
app.post("/venue",bp,function(req,res){
    console.log(req.body);
    let email = req.body.Email;
    VenueModel(req.body).save(function(err,data){
        if(err)
        {
            console.log(err);
        }
        else{
            let mailOptions = {
                from: 'Ibento <info@ibento.com>',
                to:email,
                subject: 'Ibento | New User',
                text: `Thanks For Uploading Your Venue Details on Ibento Our Executive will shortly get back`
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });  
        }
    });
});
// Sending Email via Contact Page
app.post("/contact",bp,function(req,res){
    console.log(req.body);
    let email = req.body.Email;
    let msg = req.body.Message;
    let mailOptions = {
        from:email,
        to:"winwithaman@gmail.com",
        subject: 'Ibento | Contact',
        text:msg
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
});
// Sending data to HostEvent Database
app.post("/host",bp,function(req,res){
    console.log(req.body);
    let Email = req.body.email;
    HostModel(req.body).save(function(err,data){
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("data sent to database");
            let mailOptions = {
                from: 'Ibento <info@ibento.com>',
                to:Email,
                subject: 'Host new Event',
                text: `Thank You for Hosting Event on Ibento, Our executive will get in contact.`
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });  
        }
    });
});
// Sending Review Data to Database
app.post("/review",bp,function(req,res){
    console.log(req.body);
    ReviewModel(req.body).save(function(err,data){
        console.log(err);
        console.log(data);
    });
});
//Sending the Equipment to Database
app.post("/equipments",bp,function(req,res){
    console.log(req.body);
    let email = req.body.Email;
    EquipmentModel(req.body).save(function(err,data){
        if(err)
        {
            console.log(err);
        }
        else{
            let mailOptions = {
                from: 'Ibento <info@ibento.com>',
                to:email,
                subject: 'Ibento | Rental',
                text: `Welcome to Ibento thanks for renting equipment from Ibento`
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });  
        }
    });
});

