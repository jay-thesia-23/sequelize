var Image = require("../models").Image;
var Comment = require("../models").Comment;
var Video = require("../models").Video;

//polymorphic  association

var polyInsert = async (req, res) => {
  let dataPoly;
  let type = req.params.type;
  let { title, url, text } = req.body;

  console.log(type);
  try {
    if (type == "Image") {
      dataPoly = await Image.create({
        title,
        url,
      });
    }

    if (type == "Video") {
      dataPoly = await Video.create({
        text,
      });
    }

    console.log("make post");
    res.json(dataPoly);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error + "Error in poly",
    });
  }
};

var polyInsertComment = async (req, res) => {
  let contentid = req.params.contentid;
  let type = req.params.type;

  let { title } = req.body;

  dataPoly = await Comment.create({
    title,
    commentId: contentid,
    commentType: type,
  });

  return res.json("data is added successfully");
};

var polyDelete = async (req, res) => {
  let deleteIt;
  let type = req.params.type;

  try {
    if (type == "Image") {
      deleteIt = await Image.destroy(
        {
          where: { id: req.params.id },
        },
      
      );

      await Comment.destroy({
        where: {
          commentId: req.params.id,
        },
      });
    }

    
    if (type == "Video") {
      deleteIt = await Video.destroy(
        {
          where: { id: req.params.id },
        },
        // {
        //   include: [{ model: Comment }],
        // }
      );

    }

    console.log(deleteIt);
    res.json(deleteIt);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error + "Error in poly",
    });
  }
};

var polyDeleteComment = async (req, res) => {
  try {
    let deleteIt = await Comment.destroy({
      where: { commentId: req.params.id, commentType: req.params.type },
    });

    console.log(deleteIt);
    res.json(deleteIt);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error + "Error in poly",
    });
  }
};

var polyRecoverPost = async (req, res) => {
  await Comment.restore();
};

module.exports = {
  polyInsert,
  polyInsertComment,
  polyDeleteComment,
  polyDelete,
  polyRecoverPost,
};
