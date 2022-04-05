const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const User = require("./schema");
const app = express();

const sessionStore = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017/expressSession2",
  collectionName: "sessions2",
});
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(
  session({
    secret: "shehab2",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  req.session.is = 'shehab';
  res.json(req.session);
});
const check = (req, res,next) => {
  if (req.session.is) {
    next()
  } else {
   res.json('please login')
  }
};

//post request handler register route
app.post("/register",async (req, res) => {
  const {name,email,password}  = req.body;
  console.log({...req.body})
  const user = new User({
    name,
    email,
    password
  })
  await user.save();
});
//post request handler login route
app.post("/login",async (req, res) => {
  const {email,password}  = req.body;
  const user = await User.findOne({email});
  if(user){
    if(user.password === password){
      req.session.is = 'shehab';
      res.json('login success');
    }else{
      res.json('password is wrong')
    }
  }else{
    res.json('email is wrong')
  }
});
//get request handler about route
app.get("/about",check, (req, res) => {
  console.log(req.session)
  res.json('about page');
});
mongoose
  .connect("mongodb://localhost:27017/expressSession2")
  .then(() => {
    console.log("db connection successfull");
  })
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});