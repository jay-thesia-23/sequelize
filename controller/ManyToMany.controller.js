var song = require("../models").song;
var playlist = require("../models").playlist;
var song_playlist = require("../models").song_playlist;

//ManyToMany

var mtmInsertPost = async (req, res) => {
  try {
    //song with playlist
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

    //playlist with many songs
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
};

var mtmDelete = async (req, res) => {
  let type = req.params.type;

  try {
    if (type == "Song") {
      let songDel = await song.destroy(
        {
          where: {
            id: req.params.id,
          },
        },
        {
          include: [{ model: song_playlist }],
        }
      );

      res.json(songDel);
    }

    if (type == "Playlist") {
      let playlistDel = await playlist.destroy(
        {
          where: {
            id: req.params.id,
          },
        },
        {
          include: [{ model: song_playlist }],
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error" + error,
    });
  }
};

var mtmShowGet = async (req, res) => {
  let type = req.params.type;
  try {
    if (type == "Song") {
      let songData=await song.findAll({});

      return res.json(songData)
    }
    if(type=="Playlist"){
      let playlistData=await playlist.findAll({})

      return res.json(playlistData)
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error" + error,
    });
  }
};

module.exports = { mtmInsertPost, mtmDelete,mtmShowGet };
