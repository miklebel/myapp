require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const opn = require('opn')
const bodyParser = require("body-parser");

const usersRouter = require("./routes/users")
const postsRouter = require("./routes/posts")
const app = express();




//db configuration 
const db = require("./config/mongoKey").MongoURI;

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log("Database connected"))
    .then(opn('http://localhost:4001/'))    
    .catch(err => console.log(err));
app.use(express.static('client'));
app.set("view-engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors())
app.get("/", (req, res) => {
    res.render("login.ejs")
});
app.use("/users", usersRouter);
app.use("/posts", postsRouter);


const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
