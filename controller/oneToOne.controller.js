var users = require("../models").users;
var userDetails = require("../models").userDetails;

const insertDataPost = async (req, res) => {
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
