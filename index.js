require("dotenv").config();
const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongodb = require("./config/mongodb");
const route = require("./routes");


const app = express();


app.options("*", cors());
app.use(cors({ origin: "http://localhost:3000" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(route)
mongodb();



app.get("/", (req, res) => {
    res.send("hello world");
  });

app.listen(5000, () => {
    console.log("your port is 5000");
});