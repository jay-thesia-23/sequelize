var User = require("../models").User;
var User2 = require("../models").User2;

var Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

var selectDataGet = async (req, res) => {
  //select the specific data by id
  User.findOne({
    where: { id: "2" },
  })
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch((err) => {
      console.log("Unable to select the record" + err);
    });

  //select all the data
  User.findAll({
    attributes: ["id", "title", "age"],
  }).then((result) => {
    return res.json(result);
  });
};

//insert data to the table
var insertDatePost = async (req, res) => {
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

  //single insert

  let {title,age}=req.body
  User.create({
    title,
    age
  })
    .then(() => {
      console.log({ message: "User is inserted successfully" });
    })
    .catch((err) => {
      return res.json({ message: "Unabel to add User" + err });
    });


  User.bulkCreate([
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
};

var updateDataPut = async (req, res) => {

  let {title}=req.body
  let id=req.params.id
  User.update(
    {
      title
    },
    {
      where: { id },
    }
  ).then((result) => {
    return res.json(result);
  });
};

var deleteDataDelete = async (req, res) => {
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
};

var restoreSoftGet = async (req, res) => {
  let restoreData = await User2.restore();

  console.log(restoreData);
  res.json(restoreData);
};

//order and group
var orderGroupGet = async (req, res) => {
  let order = await User2.findAll({
    attributes: [
      "firstName",
      [Sequelize.fn("COUNT", Sequelize.col("firstName")), "total"],
    ],

    group: ["firstName"],
    order: [[Sequelize.col("firstName"), "ASC"]],
    having: {
      total: {
        [Op.gt]: 2,
      },
    },
  });

  res.json(order);

  console.log(order);
};

module.exports = {
  selectDataGet,
  insertDatePost,
  updateDataPut,
  deleteDataDelete,
  restoreSoftGet,
  orderGroupGet,
};
