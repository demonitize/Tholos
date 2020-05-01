const express = require("express");
const router = express.Router();

const servers = require("./servers");

router.use("/servers", servers)

module.exports = router;
