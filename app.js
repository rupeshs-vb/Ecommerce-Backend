const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

const port = 3000;
const dbLink = `mongodb+srv://nikhil:${process.env.DATABASE_PASSWORD}@cluster0.ijnxw.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to Database");
});

const UserRouter = require("./routes/UserRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extend: false }));
app.use(cookieParser());
app.use(UserRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
