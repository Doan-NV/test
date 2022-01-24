const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()
const port = 3000;

// app.use(express.urlencoded());
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require('./config/database');
db.connect();
const commentRouter = require("./routes/comment.route");
app.use("/", commentRouter);

app.get("/", (req, res) => {
  res.send("Hello World! hello doannv");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
