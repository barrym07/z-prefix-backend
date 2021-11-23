const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
//functions from controllers
const { createUser, getHashedPassword, createBlog, getAllBlogs, getBlogByUser, deleteBlog, updateBlog } = require("./db_controllers/controllers.js")

const app = express();
const roundsOfSalt = 11;
const { hash, compare } = bcrypt;

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints

app.post("/createuser", (req, res) => {
  let { body } = req;
  let { username, password } = body;
  hash(password, roundsOfSalt, (err, hashedPassword) => {
    if (err) {
      res.status(500).send(err);
    } else {
      createUser(username, hashedPassword)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
  });
});

app.post("/login", (req, res) => {
  let { body } = req;
  let { username, password } = body;
  getHashedPassword(username).then((hashedPassword) => {
    compare(password, hashedPassword)
      .then((isMatched) => {
        if (isMatched) res.status(202).json("Success");
        else res.status(401).json("failed to match password");
      })
      .catch((err) => res.status(500).json(err));
  });
});

app.get("/blogs", (req, res) => {
  getAllBlogs()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get("/blogs/:username", (req, res) => {
  let { username } = req.params;
  getBlogByUser(username)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.post("/blogs", (req, res) => {
  let { body } = req;
  let { title, content, username } = body;
  let created_at = new Date();
  createBlog(title, content, username, created_at)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

//these endpoints work but return an error of {"code":"ERR_HTTP_INVALID_STATUS_CODE"}
app.put("/blogs/:blogId", (req, res) => {
  let { blogId } = req.params;
  let { body } = req;
  let { title, content } = body;
  // const err = new Error("Blog not found");
  // const status = err.status || 500
  updateBlog(req.params.blogId, title, content)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(err));
});

//these endpoints work but return an error of {"code":"ERR_HTTP_INVALID_STATUS_CODE"}
app.delete("/blogs/:blogId", (req, res) => {
  let { blogId } = req.params;
  deleteBlog(blogId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});



module.exports = app;