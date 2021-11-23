// using controllers for best practice
const knex = require("./dbConnection");

//user functions
function createUser(username, hashedPassword) {
  return knex("users")
    .insert({
      username: username,
      password: hashedPassword
    })
    .then(data => data);
}

function getHashedPassword(username) {
  return knex("users")
    .where("username", username)
    .select("password")
    .then(data => data[0].password);
}


//blog functions
function createBlog(title, content, username, date) {
  // I could not get this to work by searching for the user_id so I changed the foreign key to username
  // let id = (knex().from("users").select("id").where("username", username))
  return knex("posts")
    .insert({
      title: title,
      body: content,
      user_name: username,
      created_at: date
    }).returning("*")
    .then(data => data);
}

function getAllBlogs() {
  return knex("posts")
    .select("*")
    .then(data => data);
}
//join might not be correct
function getBlogByUser(username) {
  return knex("posts")
    // .join("users", "posts.user_id", "users.id")
    .select("*")
    .where("user_name", username)
    .then(data => data);
}

function deleteBlog(id) {
  return knex("posts")
    .where("id", id)
    .del()
    .then(data => data);
}

function updateBlog(id, title, content) {
  return knex("posts")
    .where("id", id)
    .update({
      title: title,
      body: content
    })
    .then(data => data);
}


module.exports = { createUser, getHashedPassword, createBlog, getAllBlogs, getBlogByUser, deleteBlog, updateBlog };