//implementing dotenv for sensitive data
require("dotenv").config();

//adding config to store variable of env
const config = require("./src/config.js");

//postgreSQL connecting the database to node js
const { Client } = require("pg");

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Batman65_Tie",
  database: "expenseTracker",
});

con.connect().then(() => console.log("connected"));

//backeend node js code to POST and receive registration
const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { CLIENT_RENEG_LIMIT } = require("tls");

// CORS options to allow requests from frontend running on port 5500
const corsOptions = {
  origin: "http://localhost:5500", // Allow only requests from this origin
  methods: "GET,POST", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
};

//middleware
//CORS allows for data to be fetch from different ports so my front end (5500) can get data from the back end (3000)
app.use(cors());
app.use(express.static(path.join(__dirname, "NEA-frontend")));
app.use(express.json());

//signup page where the user name and password is created. Then the URL of the page that has the created username and password, is requested by the server
app.get("/signUp", (req, res) => {
  res.sendFile("signUp.html", { root: __dirname });
});

//POST inputs put in the registration is sent to database
app.post("/form", (req, res) => {
  const { username, password } = req.body;

  //This is the query asking to insert the inputs from form box of login page to the database in postgresql
  const insert_query =
    "INSERT INTO expensesheet (username,password) VALUES ($1,$2)";

  //The database checks for no error and is stored in database when submit is clicked
  con.query(insert_query, [username, password], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(req.body);
      console.log("complete");
      res.send("POSTED DATA");
    }
  });
});

//To delete data from the database (using POSTMAN software)
app.delete("/delete/:username", (req, res) => {
  const username = req.params.username;
  const delete_query = "Delete from expensesheet where username = $1";
  con.query(delete_query, [username], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//this get method creates a URL with all the database stored in JSON format
app.get("/fetchdata", (req, res) => {
  const fetch_query = "SELECT * from expensesheet";
  con.query(fetch_query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/EURconvert", (req, res) => {
  const EURconversion = [];
  const EUR = axios
    .get(`https://v6.exchangerate-api.com/v6/${config.env}/latest/EUR`)
    .then((response) => {
      console.log(response.data.conversion_rates.GBP);
      EURconversion.push(response.data.conversion_rates.GBP);
      res.send(EURconversion);
    });
});

// axios
//   .get(`https://v6.exchangerate-api.com/v6/${config.env}/latest/EUR`)
//   .then((response) => {
//     console.log(response.data.conversion_rates.GBP);
//     const EURtoGBP = response.data.conversion_rates.GBP
//     res.send(response)
//     return EURtoGBP
//   })
//   .catch((response) => {
//     console.log(error);
//   });

//This is the server port and just shows the server is running
app.listen(3000, () => {
  console.log(`server is listening... Port:${config.port}`);
});
