const express = require("express");
// const sequelize = require("./config/database");
var app = express();
app.use(express.json())
const { Op, QueryInterface } = require("sequelize");
// var user = require("./models/user.model");
// var { paranoidDelete, userTable } = require("./models");
var User2 = require("./models").User2;


//random first name generate

const fname =['vishwa','nandani','jay','seema','vivek','sagar','meet','madhav','pooja','tulsi','om','mansi','om','nisarg','divyang','datta','gunjan'];

const lname =['joshi','gajjar','thesia','upadhyay','dave','bhatt','barot','trivedi','parekh','khatri','vardiwale','gor','patel'];


const email = ['graham.daugherty@gmail.com', 'lamar_reilly35@hotmail.com', 'jean87@hotmail.com',
'cade29@yahoo.com', 'abdullah.blick@yahoo.com', 'dorothea.beatty24@yahoo.com', 'florian12@yahoo.com', 'orie44@hotmail.com',
'norwood.orn6@yahoo.com', 'mckayla_stanton12@hotmail.com', 'kevin_spencer78@hotmail.com', 'danny_thiel@yahoo.com', 'rosalee79@gmail.com'];

var ranFname=[]
var ranLname=[]
var ranEmailname=[]
for(let i=0;i<100;i++){
  ranFname.push(fname[Math.floor(Math.random()*fname.length)])
  ranLname.push(lname[Math.floor(Math.random()*lname.length)])
  ranEmailname.push(email[Math.floor(Math.random()*email.length)])

  
}


app.get("/insert", (req, res) => {
  //single insert
  User2
    .create({
      firstname: "helllo",
      age: "100",
    })
    .then(() => {
      console.log({ message: "User is inserted successfully" });
    })
    .catch((err) => {
      return res.json({ message: "Unabel to add user" + err });
    });

  //bulk insert

 

    
    user.create({
      title: title,
      age: age
    })
    .then(() => {
      console.log({ message: "User is inserted successfully" });
    })
    .catch((err) => {
      return res.json({ message: "Unabel to add user" + err });
    });

  user
    .bulkCreate([
      {
        title: "test1",
        age: "18",
      },
      {
        title: "test2",
        age: "19",
      },
    ])
    .then(() => {
      console.log("add the bulk recored inserted");
    })
    .catch((err) => {
      return res.json({ message: "Unable to add the bulk insert" + err });
    });

  res.end();
});

app.get("/delete", async (req, res) => {
  //user table delete

  
  // user
  //   .destroy({ where: { id: "2" } })
  //   .then(() => {
  //     console.log("Deleted the record");
  //   })
  //   .catch((err) => {
  //     console.log("Unable to delete the record" + err);
  //   });
    

  //paranoid soft delete

  try {

    console.log("insdide try");
    const id=req.body.id

    console.log(id,"id in postmen")
    let softPara=await User2.destroy({ where: { id: id }})
    res.json(softPara);
  } catch (error) {
    res.json("error "+error);
  }

  res.end();
});

app.get("/select", (req, res) => {
  //select all the data

  user.findAll({
      attributes:["id","title","age"]
  }).then((result)=>{
      return res.json(result)
  })

  //select the specific data by id

  user
    .findOne({
      where: { id: "2" },
    })
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch((err) => {
      console.log("Unable to select the record" + err);
    });
});

app.get("/update", (req, res) => {
  user
    .update(
      {
        title: "change to 2",
      },
      {
        where: { id: "78" },
      }
    )
    .then((result) => {
      return res.json(result);
    });
});

app.get("/orderngroup",async (req,res)=>{

 let order= await user.findAll({

  attributes:["age",[sequelize.fn(("COUNT"),sequelize.col("age")), "total"]],

  group:["age"],
  order:[[sequelize.col("age"),"ASC"]],
  having:{
    total:{
      [Op.gt]:2
    }
  }
 })

 res.json(order)

 console.log(order);

})


app.get("/pagenation",async(req,res)=>{

})
//literal to run the raw query

app.get("/literal", (req, res) => {
  user.findAll({
    attributes: [],
  });
});
app.listen(5000, (error) => {
  if (error) throw error;

  console.log("Connect to the DB");
});
