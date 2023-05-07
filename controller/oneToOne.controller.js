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
<<<<<<< HEAD
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
=======
  const { name, userName, mobileNum, address } = req.body;

  var insertDataPost = await users.create(
    {
      name,
      username: userName,
      userDetail: [
        {
          mobileNum,
          address,
        },
      ],
    },
    {
      include: userDetails,
    }
  );

  return res.json(insertDataPost);
};

const deleteDataPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await users.destroy({
      where: {
        id: userId,
      },
      cascade: true,
      include: [
        {
          model: userDetails,
          cascade: true,
        },
      ],
    });
    return res.json(results);
  } catch (e) {
    console.log("error deleting user:", e);
    return h.response("Failed:", e.message).code(500);
  }
};

const updateDataUser = async (req, res) => {
  var { userId } = req.params;

  const { name, userName, mobileNum, address } = req.body;

  const updateUsersObject = {
    name,
    userName,
  };
  const updateUsersDetailsObject = {
    mobileNum,
    address,
  };

  try {
    const updatePromises = [];
    const updateUsersPromise = users.update(updateUsersObject, {
      where: { id: userId },
    });
    updatePromises.push(updateUsersPromise);

    const updateUserDetailsPromise = userDetails.update(
      updateUsersDetailsObject,
      { where: { userId } }
    );
    updatePromises.push(updateUserDetailsPromise);

    await Promise.all(updatePromises);
    return "user records updates";
  } catch (e) {
    console.log("error updating user:", e);
    return res.json({message:"error"+e})
  }
};
module.exports = { insertDataPost, deleteDataPost, updateDataUser };
>>>>>>> 48264e7decfb39ecf8c74621cd3778a38394b5f6
