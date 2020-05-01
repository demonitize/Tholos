require("dotenv").config();
const express = require("express");
const database = require("../database");
const router = express.Router();

router.post("/addServer", (req, res) => {
  if (Object.keys(req.query).length != 9) {
    res.send("MISSING PARAMS");
    return;
  }
  if (req.query.auth != process.env.BOTAUTHORIZATION) {
    res.send("AUTH INVALID");
    return;
  }
  database.addServer(req.query);
  res.send("server added to listings");
});

router.post("/addServerDescription", (req, res) => {
  if (Object.keys(req.query).length != 3) {
    res.send("MISSING PARAMS");
    return;
  }
  if (req.query.auth != process.env.BOTAUTHORIZATION) {
    res.send("AUTH INVALID");
    return;
  }

  database.updateServerDescription(req.query);
  res.send("description updated");
});

router.post("/addServerTags", (req, res) => {
  if (Object.keys(req.query).length != 3) {
    res.send("MISSING PARAMS");
    return;
  }
  if (req.query.auth != process.env.BOTAUTHORIZATION) {
    res.send("AUTH INVALID");
    return;
  }

  database.updateServerTags(req.query);
  res.send("tags added");
});

router.get("/listServers", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(database.listServers()));
});

router.get("/server/:serverID", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(database.readServer(req.params.serverID)));
});

module.exports = router;
