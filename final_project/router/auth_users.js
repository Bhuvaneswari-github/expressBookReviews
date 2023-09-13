const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        var yahoo = [];
        const isbnValue = req.params.isbn;
        var data = JSON.parse(JSON.stringify(books), function(key, value) { 
          if ( value.isbn === isbnValue ) 
          yahoo.push(value);
         });
         let filtered_users = yahoo.filter((yahoo) => yahoo.isbn === isbnValue);
         if (filtered_users.length > 0) {
             let filtered_user = filtered_users[0];
             let DOB = req.query.reviews;
             //if the DOB has changed
             if(DOB) {
                 filtered_user.reviews = DOB
             }
                        yahoo = yahoo.filter((user) => user.isbn = isbnValue);
             yahoo.push(filtered_user);
             res.send(`User with the isbn  ${isbnValue} updated.`);
         }
         else{
             res.send("Unable to find user!");
         }
    } 
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        var yahoo = [];
        const isbnValue = req.params.isbn;
        var data = JSON.parse(JSON.stringify(books), function(key, value) { 
          if ( value.isbn === isbnValue ) 
          yahoo.push(value);
         });
         let filtered_users = yahoo.filter((yahoo) => yahoo.isbn === isbnValue);
         if (filtered_users.length > 0) {
             let filtered_user = filtered_users[0];
           
            yahoo = yahoo.filter((user) => user.isbn != isbnValue);
             yahoo.push(filtered_user);
             res.send(`User with the isbn  ${isbnValue} updated.`);
         }
         else{
             res.send("Unable to find user!");
         }
    } 
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
