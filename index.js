const express = require("express");
// const sequelize = require("./config/database");
var app = express();
app.use(express.json());


const { sequelize } = require("./models");
var User = require("./models").User;
var User2 = require("./models").User2;

var userScope = require("./models").userscope;

var basicCrud = require("./router/basicCRUD.router")
app.use(basicCrud)

var oneToOne = require("./router/oneToOne.router")
app.use(oneToOne)


var oneToMany = require("./router/oneToMany.router")
app.use(oneToMany)

var ManyToMany = require("./router/manyToMany.router")
app.use(ManyToMany)

var oneToManyPoly = require("./router/oneToManyPoly.router");
app.use(oneToManyPoly);

var manyToManyPoly = require("./router/manyToManyPoly.router")
app.use(manyToManyPoly)

//scope
app.get("/scope", async(req, res) => {
    /*
    try {
      let above18 = await userScope.scope("showUserAbove18").findAll({});
      res.json(above18);

      }
      */

    try {
        let above18 = await User.scope("ageAbove30").findAll({});

        console.log(above18);
        res.json(above18);
    } catch (error) {
        console.log(error, "error");
        res.json(error);
    }
});



//order and group
app.get("/orderngroup", async(req, res) => {
    let order = await User2.findAll({
        attributes: [
            "firstName", [sequelize.fn("COUNT", sequelize.col("firstName")), "total"],
        ],

        group: ["firstName"],
        order: [
            [sequelize.col("firstName"), "ASC"]
        ],
        having: {
            total: {
                [Op.gt]: 2,
            },
        },
    });

    res.json(order);

    console.log(order);
});

app.get("/pagenation", async(req, res) => {
    let page = req.query.page || 1;
    let limit = 10;
    let offset = (page - 1) * limit || 0;
    let order = req.query.order || "ASC";
    let prevOrder = req.query.order || "ASC";
    let colName = req.query.colName || "firstName";

    console.log(page, limit, offset, "log check");


    console.log(order);
});

app.get("/pagenation", async(req, res) => {
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
            order: [
                [`${colName}`, `${order}`]
            ],
            paranoid: false,
        });

        res.json(dataOfPagenation);
    } catch (error) {
        res.json({ message: "Error: " + error });
    }
});

app.get("/search", async(req, res) => {
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