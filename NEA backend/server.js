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
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

// CORS options to allow requests from frontend running on port 5500
const corsOptions = {
  origin: "http://localhost:5500", // Allow only requests from this origin
  methods: "GET,POST", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
};

//middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "NEA-frontend")));
app.use(express.json());

//signup page where information of URL is requested from the server
app.get("/signUp", (req, res) => {
  res.sendFile("signUp.html", { root: __dirname });
});

//POST inputs put in the registration is sent to database
app.post("/form", (req, res) => {
  const { username, password } = req.body;

  //The database checks for no error and is stored in database when submit is clicked
  const insert_query =
    "INSERT INTO expensesheet (username,password) VALUES ($1,$2)";

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

//To delete data from the database
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

//This is the server port and just shows the server is running
app.listen(3000, () => {
  console.log("server is listening...");
});
