const express = require("express");
const sequelize = require("./config/database");
var app = express();
const { Op, QueryInterface } = require("sequelize");
// var user = require("./models/user.model");
// var { paranoidDelete, userTable } = require("./models");
var User2 = require("./models").User2;



// app.get("/insert", (req, res) => {
//   //single insert
//   userTable
//     .create({
//       title: "helllo",
//       age: "100",
//     })
//     .then(() => {
//       console.log({ message: "User is inserted successfully" });
//     })
//     .catch((err) => {
//       return res.json({ message: "Unabel to add user" + err });
//     });

//   //bulk insert

//     let title=Math.random().toString(36).substring(2,6)
//     let age=Math.floor(Math.random()*100)

//     console.log(title,age,"data insertec");
//     user.create({
//       title: title,
//       age: age
//     })
//     .then(() => {
//       console.log({ message: "User is inserted successfully" });
//     })
//     .catch((err) => {
//       return res.json({ message: "Unabel to add user" + err });
//     });

//   user
//     .bulkCreate([
//       {
//         title: "test1",
//         age: "18",
//       },
//       {
//         title: "test2",
//         age: "19",
//       },
//     ])
//     .then(() => {
//       console.log("add the bulk recored inserted");
//     })
//     .catch((err) => {
//       return res.json({ message: "Unable to add the bulk insert" + err });
//     });

//   res.end();
// });

app.get("/delete", async (req, res) => {
  //user table delete

  /*
  user
    .destroy({ where: { id: "2" } })
    .then(() => {
      console.log("Deleted the record");
    })
    .catch((err) => {
      console.log("Unable to delete the record" + err);
    });
    */

  //paranoid soft delete

  try {
    const userId = 1;

    let user = await User2.findAll({paranoid:false});

    res.json(user)
    let softPara=await User2.destroy({ where: { id: 2 }})
    
    // res.json(softPara);
  } catch (error) {
    console.log(error);
  }

  res.end();
});

// app.get("/select", (req, res) => {
//   //select all the data

//   // user.findAll({
//   //     attributes:["id","title","age"]
//   // }).then((result)=>{
//   //     return res.json(result)
//   // })

//   //select the specific data by id

//   user
//     .findOne({
//       where: { id: "2" },
//     })
//     .then((result) => {
//       console.log(result);
//       return res.json(result);
//     })
//     .catch((err) => {
//       console.log("Unable to select the record" + err);
//     });
// });

// app.get("/update", (req, res) => {
//   user
//     .update(
//       {
//         title: "change to 2",
//       },
//       {
//         where: { id: "78" },
//       }
//     )
//     .then((result) => {
//       return res.json(result);
//     });
// });

// app.get("/orderngroup",async (req,res)=>{

//  let order= await user.findAll({

//   attributes:["age",[sequelize.fn(("COUNT"),sequelize.col("age")), "total"]],

//   group:["age"],
//   order:[[sequelize.col("age"),"ASC"]],
//   having:{
//     total:{
//       [Op.gt]:2
//     }
//   }
//  })

//  res.json(order)

//  console.log(order);

// })

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
