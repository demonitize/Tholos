// const fs = require("fs");
const express = require("express");
const app = express();

const api = require("./api/index");

app.use("/", express.static("./views/home"));
app.use("/about", express.static("./views/about"));
app.use("/browse", express.static("./views/browse"));
app.use("/api", api);

app.listen(3000);
