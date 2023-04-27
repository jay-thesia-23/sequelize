const express = require("express");
// const sequelize = require("./config/database");
var app = express();
app.use(express.json());
const { Op, QueryInterface, DataTypes, Model } = require("sequelize");

const { sequelize } = require("./models");
var User = require("./models").User;
var User2 = require("./models").User2;
var team = require("./models").team;
var player = require("./models").player;
var song = require("./models").song;
var playlist = require("./models").playlist;
var userScope = require("./models").userscope;


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

var oneToManyPoly = require("./router/oneToManyPoly.router");
app.use(oneToManyPoly);

//scope
app.post("/scope", async (req, res) => {
  /*
  try {
    let above18 = await userScope.scope("showUserAbove18").findAll({});
    res.json(above18);

  }
  */

  try {
    let above18 = await userScope.findAll({});

    console.log(above18);
    res.json(above18);
  } catch (error) {
    console.log(error, "eror");
    res.json(error);
  }
});

//ManyToMany
app.post("/manytomany", async (req, res) => {
  try {
    /*
  let dataMany=await song.create({
    songName:"Lover",
    artistName:"Tylor Swift",
    releaseYear:2019,
    length:"3:06",
    playlists:[{
      playlistName:"Swift_album",
      totalSongs:23,
      rank:2,
      size:4.5
    }]
  },{
    include: playlist
  })
  */

    /*
  let dataMany=await song.create({
    songName:"After Hours",
    artistName:"Weekend",
    releaseYear:2020,
    length:"4:05",
    playlists:[{
      playlistName:"Weekend's bash",
      totalSongs:10,
      rank:3,
      size:3
    }]
  },{
    include: playlist
  })

  res.status(200).json({
    success:true,
    message:"Data is inserted!!!",
    data:dataMany
  })
*/

    let dataMany = await playlist.create(
      {
        playlistName: "pop",
        totalSongs: 23,
        rank: 1,
        size: 6,
        songs: [
          {
            songName: "snap",
            artistName: "xyz",
            releaseYear: 2022,
            length: "4:06",
          },
        ],
      },
      {
        include: [{ model: song }],
      }
    );

    res.status(200).json({
      success: true,
      data: dataMany,
    });
  } catch (error) {
    console.log(error, "it is errlr");
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

//oneToMany
app.get("/showplayer", async (req, res) => {
  try {
    let teamPlayer = await team.findAll({
      include: [{ model: player }],
    });

    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully!!!",
      data: teamPlayer,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/team", async (req, res) => {
  try {
    console.log("inside team");
    await team.bulkCreate([
      {
        teamName: "Channai Super Kings",
        shortName: "CSK",
        city: "Channai",
      },
      {
        teamName: "Mumbai Indians",
        shortName: "MI",
        city: "Mumbai",
      },
    ]);
  } catch (error) {
    console.log(error, "error");
  }

  await player.bulkCreate([
    {
      firstName: "MS",
      lastName: "Dhoni",
      teamId: 1,
    },
    {
      firstName: "Raviandra",
      lastName: "Jadeja",
      teamId: 1,
    },
    {
      firstName: "Rohit",
      lastName: "Sharma",
      teamId: 2,
    },
  ]);

  res.end();
});

//add table
app.get("/add", async (req, res) => {
  class test24 extends Model {}

  test24.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "test24s",
    }
  );
  // let test24=await sequelize.define("NewTableTest",{
  //   id:{
  //     type:DataTypes.INTEGER,
  //     primaryKey:true

  //   },
  //   firstname:{
  //     type:DataTypes.STRING
  //   }
  // },{

  // })

  test24.sync({ alter: true });

  console.log(test24, "create table");
  res.end();
});

//insert data to the table
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

  User.create({
    title: "first",
    age: 12,
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

app.get("/restorSoftDelete", async (req, res) => {
  let restoreData = await User2.restore();

  console.log(restoreData);
  res.json(restoreData);
});

app.get("/select", (req, res) => {
  //select all the data

  User.findAll({
    attributes: ["id", "title", "age"],
  }).then((result) => {
    return res.json(result);
  });

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
});

app.get("/update", (req, res) => {
  User.update(
    {
      title: "change to 2",
    },
    {
      where: { id: "78" },
    }
  ).then((result) => {
    return res.json(result);
  });
});

app.get("/orderngroup", async (req, res) => {
  let order = await User2.findAll({
    attributes: [
      "firstName",
      [sequelize.fn("COUNT", sequelize.col("firstName")), "total"],
    ],

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
  let fname = req.query.fname || "";
  let lname = req.query.lname || "";
  let email = req.query.email || "";

  let colName = req.query.colName;
  let type = req.query.type || "and";
  console.log(colName);

  try {
    let dataSearch;

    if (type == "or") {
      dataSearch = await User2.findAll({
        where: {
          [Op.or]: {
            firstName: {
              [Op.like]: `${fname}`,
            },
            lastName: {
              [Op.like]: `${lname}`,
            },
            email: {
              [Op.like]: `${email}`,
            },
          },
        },
      });
    } else {
      dataSearch = await User2.findAll({
        where: {
          [Op.and]: {
            firstName: {
              [Op.like]: `%${fname}%`,
            },
            lastName: {
              [Op.like]: `%${lname}%`,
            },
            email: {
              [Op.like]: `%${email}%`,
            },
          },
        },
      });
    }

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
