

var users = require("../models").users;
var userDetails = require("../models").userDetails;

const insertDataPost = async (req, res) => {
  const { name, userName, mobileNum, address } = req.body;

  var insertDataPost = await users.create(
    {
      name,
      username:userName,
      userDetail: [
        {
          mobileNum,
          address,
        },
      ],
    },
    {
      include: userDetails
      
    }
  );

  return res.json(insertDataPost)
};


const deleteDataPost=async (req,res)=>{
  try {
    const { userId } = req.params;
    const results = await users.destroy({
      where: {
        id: userId,
      },
      cascade: true,
      include: [{
        model: userDetails,
        cascade: true,
      }],
    });
    return res.json(results)


  } catch (e) {
    console.log('error deleting user:', e);
    return h.response('Failed:', e.message).code(500);
  }
}

const updateDataUser=async (req,res)=>{

  https://siddharth-lakhara.medium.com/understanding-sequelize-associations-part-1-one-to-one-1-1-mapping-897ce176caf9
}
module.exports = { insertDataPost,deleteDataPost,updateDataUser };
