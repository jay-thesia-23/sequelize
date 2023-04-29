var tag = require("../models").tag;
var Image = require("../models").Image;
var Comment = require("../models").Comment;
var Video = require("../models").Video;

var polyAddTagPost = async (req, res) => {
  let type = req.params.type;

  let {title,url,name}=req.body

  try {
    let imageWithTag;
    if (type == "Image") {
      imageWithTag = await Image.create(
        {
          title,
          url,
          tags: [
            {
              name,
            },
          ],
        },
        {
          include: tag,
        }
      );
    }

    if (type == "Video") {

      
    }

    return res.json(imageWithTag);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error + "Error in poly",
    });
  }
};

module.exports = { polyAddTagPost };
