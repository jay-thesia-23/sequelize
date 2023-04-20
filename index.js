const express = require("express");
// const sequelize = require("./config/database");
var app = express();
app.use(express.json());
const { Op, QueryInterface } = require("sequelize");
const { sequelize } = require("./models");
var User = require("./models").User;
var User2 = require("./models").User2;

//random first name generate

const fname = [
  "vishwa",
  "nandani",
  "jay",
  "seema",
  "vivek",
  "sagar",
  "meet",
  "madhav",
  "pooja",
  "tulsi",
  "om",
  "mansi",
  "om",
  "nisarg",
  "divyang",
  "datta",
  "gunjan",
];

const lname = [
  "joshi",
  "gajjar",
  "thesia",
  "upadhyay",
  "dave",
  "bhatt",
  "barot",
  "trivedi",
  "parekh",
  "khatri",
  "vardiwale",
  "gor",
  "patel",
];

const email = [
  "graham.daugherty@gmail.com",
  "lamar_reilly35@hotmail.com",
  "jean87@hotmail.com",
  "cade29@yahoo.com",
  "abdullah.blick@yahoo.com",
  "dorothea.beatty24@yahoo.com",
  "florian12@yahoo.com",
  "orie44@hotmail.com",
  "norwood.orn6@yahoo.com",
  "mckayla_stanton12@hotmail.com",
  "kevin_spencer78@hotmail.com",
  "danny_thiel@yahoo.com",
  "rosalee79@gmail.com",
];

var ranFname = [];
var ranLname = [];
var ranEmailname = [];
for (let i = 0; i < 100; i++) {
  ranFname.push(fname[Math.floor(Math.random() * fname.length)]);
  ranLname.push(lname[Math.floor(Math.random() * lname.length)]);
  ranEmailname.push(email[Math.floor(Math.random() * email.length)]);
}

app.get("/insert", (req, res) => {
  //single insert
  User2.create({
    firstname: "helllo",
    age: "100",
  })
    .then(() => {
      return res.json({ message: "User is inserted successfully" });
    })
    .catch((err) => {
      return res.json({ message: "Unabel to add User" + err });
    });

  //bulk insert

  
  User
    .create({
      title: "first",
      age: 12,
    })
    .then(() => {
      console.log({ message: "User is inserted successfully" });
    })
    .catch((err) => {
      return res.json({ message: "Unabel to add User" + err });
    });

  User
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
});

app.get("/delete", async (req, res) => {
  //User table delete

  /*
  User
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
    const idstart = req.body.idstart;
    const idend = req.body.idend;

    let softPara = await User2.destroy({
      where: {
        id: {
          [Op.between]: [idstart, idend],
        },
      },
    });

    console.log("soft deleted");
    res.json(softPara);
  } catch (error) {
    res.json("error " + error);
  }

  res.end();
});

app.get("/restorSoftDelete",async(req,res)=>{
  let restoreData=await User2.restore()

  console.log(restoreData);
  res.json(restoreData)
})

app.get("/select", (req, res) => {
  //select all the data

  User
    .findAll({
      attributes: ["id", "title", "age"],
    })
    .then((result) => {
      return res.json(result);
    });

  //select the specific data by id

  User
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
  User
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

app.get("/orderngroup", async (req, res) => {
  let order = await User2.findAll({
    attributes: ["firstName", [sequelize.fn("COUNT", sequelize.col("firstName")), "total"]],

    group: ["firstName"],
    order: [[sequelize.col("firstName"), "ASC"]],
    having: {
      total: {
        [Op.gt]: 2,
      },
    },
  });

  res.json(order);

  console.log(order);
});

app.get("/pagenation", async (req, res) => {
  let page = req.query.page || 1;
  let limit = 10;
  let offset = (page - 1) * limit || 0;
  let order = req.query.order || "ASC";
  let prevOrder = req.query.order || "ASC";
  let colName = req.query.colName || "firstName";

  console.log(page, limit, offset, "log check");
  //dynamic data add

  /*
  for (let i = 0; i < 100; i++) {
    try {
      let addPageData = await User2.create({
        firstName: ranFname[i],
        lastName: ranLname[i],
        email: ranEmailname[i],
      });

      console.log(addPageData, "data is add in User database");
    } catch (error) {
      res.json({ message: "Unable to add data in the db" });
    }
  }
  */

  //with deleted records

  /*
  try {

    //count total records
    let total=await User2.count({paranoid:false})

    console.log(total);


  if(offset>=total){
    offset=total-limit
  }

    //show particular page records
    let dataOfPagenation =await User2.findAll({
      offset:offset,
      limit:limit,
      paranoid:false
     
    });

    res.json(dataOfPagenation);
  } catch (error) {
    res.json({ message: "Error: " + error });
  }
  */

  //No delete records

  try {
    //count total records
    let total = await User2.count({ paranoid: false });

    console.log(total);

    if (offset >= total) {
      offset = total - limit;
    }

    //show particular page records
    let dataOfPagenation = await User2.findAll({
      offset: offset,
      limit: limit,
      order: [[`${colName}`, `${order}`]],
      paranoid: false,
    });

    res.json(dataOfPagenation);
  } catch (error) {
    res.json({ message: "Error: " + error });
  }
});

app.get("/search", async (req, res) => {
  let search = req.query.search || "";
  let colName = req.query.colName;
  console.log(colName);

  let obj =
    colName == "firstName"
      ? {
          firstName: {
            [Op.like]: `%${search}%`,
          },
        }
      : {
          lastName: {
            [Op.like]: `%${search}%`,
          },
        };

  console.log(obj, "seelect");
  console.log(search);

  try {
    let dataSearch = await User2.findAll({
      where: {
        [Op.and]:{
          firstName: {
            [Op.like]: `%${search}%`,
          },
          lastName:{
            [Op.like]: `%${search}%`,
          },
          email:{
            [Op.like]: `%${search}%`,
          }

        }
      },
    });

    console.log(dataSearch, "data search");

    return res.json(dataSearch);
  } catch (error) {
    return res.json({ message: "Unable to fetch the search data =>" + error });
  }
});


//literal to run the raw query

app.get("/literal", (req, res) => {
  User.findAll({
    attributes: [],
  });
});



app.listen(5000, (error) => {
  if (error) throw error;

  console.log("Connect to the DB");
});
