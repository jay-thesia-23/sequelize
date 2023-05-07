var users = require("../models").users;
var userDetails = require("../models").userDetails;

const showDataGet = async (req, res) => {
  try {
    let getData = await users.findAll({
      include: [{ model: userDetails }],
    });

    return res.json({
      status: "Success",
      data: getData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Fail",
      error: "Error" + error,
    });
  }
};

const insertDataPost = async (req, res) => {
  const { name, mobileNum, address, age } = req.body;

  console.log(req.body);
  try {
    var insertData = await users.create(
      {
        name,
        age,

        userDetail: [
          {
            mobileNum,
            address,
          },
        ],
      },
      {
        include: [
          {
            model: userDetails,
          },
        ],
      }
    );

    return res.status(200).json({
      data: insertData,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error + " ....Error" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteValue = await users.destroy(
      {
        where: {
          id: req.params.id,
        },
        cascade: true,
      },
      {
        include: [{ model: userDetails }],
      }
    );

    return res.json({
      status: "Success",
      data: deleteValue,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error : " + error,
    });
  }
};

const updateData = async (req, res) => {
  const { name, title, mobileNum, address, age } = req.body;

  try {
    const updateData = await users.update(
      {
        name,
        title,
        age,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const updateDetails = await userDetails.update(
      {
        mobileNum,
        address,
      },
      {
        where: {
          userId: req.params.id,
        },
      }
    );

    await Promise.all([updateData,updateDetails])
    return res.json({
      status: "Success",
      data: updateData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error : " + error,
    });
  }
};

module.exports = { showDataGet, insertDataPost, deleteData, updateData };
