# Deployed Location

This project is deployed to Heroku [Link](https://barry-z-prefix-api.herokuapp.com/).

## About the application

This is the backend of a full stack PERN CRUD application.

## Endpoints

### /createuser - POST
Takes an object to create a user.

{
  "username": "name",
  "password": "password"
}

### /login - POST
Takes an object to login.

{
  "username": "name",
  "password": "password"
}

### /blogs - GET
Returns an array of all posts.

### /blogs/:blogId - GET
Returns a specific post with provided ID.

### /?user= - GET
Returns all posts by the searched user.

### /create - POST
Takes in an object of title, content, and username. It will auto generate the date timestamp.

{
  "title": "My post",
  "content": "many words can go here",
  "username": "name"
}

### /blogs/:blogId - PUT
Will update the post with specified ID. Takes an object and will update the stored post before returning it.

{
  "title": "My updated post",
  "content": "many words can go here"
}

### /blogs/:blogId - DELETE
Will delete the post with the specified ID.


# Other projects
The backend for this project is located [here](https://github.com/barrym07/z-prefix-frontend)