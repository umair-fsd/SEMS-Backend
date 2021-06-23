const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
var cors = require("cors");
app.use(cors());
const mysql = require("mysql");
var multer = require("multer");
var cors = require("cors");
var upload = multer({ dest: "uploads/" });
var path = require("path");
var fs = require("fs");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "areeb_loserne",
//   password: "areeb_loserne",
//   database: "areeb_loserne",
//   multipleStatements: true,
// });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quizDB",
  multipleStatements: true,
});

connection.connect(function (err) {
  err ? console.log(err) : console.log("connection successfull");
});

app.use(express.static(`${__dirname}/uploads`));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

app.use(cors());

require("./routes/html-routes")(app, connection, upload);

// SET STORAGE
let file_name = Date.now();
let image_name = file_name;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    image_name = file_name + "-" + file.originalname;
    cb(null, image_name);
  },
});

var upload = multer({ storage: storage }).single("file");
require("./routes/html-routes_image")(
  app,
  connection,
  upload,
  multer,
  image_name
);

/* Start the server */
app.listen(PORT, "192.168.8.108", () => {
  console.log(`Quiz app listening on port ${PORT}!`);
});
