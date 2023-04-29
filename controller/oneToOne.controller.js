var users = require("../models").users;
var userDetails = require("../models").userDetails;

const insertDataPost = async (req, res) => {
  const { name, userName, mobileNum, address } = req.body;

  var insertDataPost = await users.create(
    {
      name,
      username:userName,
      userDetails: [
        {
          mobileNum,
          address,
        },
      ],
    },
    {
      include: [{
        model: userDetails,
      }],
    }
  );
};

module.exports = { insertDataPost };
