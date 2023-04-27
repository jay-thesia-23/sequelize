var express = require("express");
var Image = require("../models").Image;
var Comment = require("../models").Comment;
var Video = require("../models").Video;

//polymorphic  association

var polyInsert = async (req, res) => {
  let dataPoly;
  let type = req.params.type;

  console.log(type);
  try {
    if (type == "Image") {
      dataPoly = await Image.create({
        title: "Tony pic 2",
        url: "www.googe.com",
      });
    }

    if (type == "Video") {
      dataPoly = await Video.create({
        text: "Zoo video",
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

  dataPoly = await Comment.create({
    title: "this my image or video",
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
      let deleteIt = await Image.destroy({
        where: { id: req.params.id },
      });

      await Comment.destroy({
        where: {
          commentId: req.params.id,
        },
      });
    }
    if (type == "Video") {
      deleteIt = await Image.destroy({
        where: { id: req.params.id },
      });

      await Comment.destroy({
        where: {
          commentId: req.params.id,
        },
      });
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

module.exports = {
  polyInsert,
  polyInsertComment,
  polyDeleteComment,
  polyDelete,
};
