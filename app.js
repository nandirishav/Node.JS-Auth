const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");

const app = express();

// middleware
// so that we can serve static files like css, etc to the browser
app.use(express.static("public"));
app.use(express.json());

// view engine

app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://dbUser:password1234@auth-cluster.ylxu4.mongodb.net/node-auth";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(3001, () => console.log("Listening to server 3001"))
  )
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));

app.use(authRoutes);
