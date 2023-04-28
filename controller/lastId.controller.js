var express = require("express");
const { Model } = require("sequelize");
var app = express();

var team = require("../models").team;

var lastIdGet = (req, res) => {
    var lastId = team.id;

    console.log(lastId);
    res.json(lastId);
};

module.exports = { lastIdGet };