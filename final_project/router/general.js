const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            res.send(books);
          resolve("Promise resolved")
        },6000)})
    console.log("Before calling promise");
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })
  
      console.log("After calling promise");  
 
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {       
  var yahoo = [];
  const isbnValue = req.params.isbn;
  var data = JSON.parse(JSON.stringify(books), function(key, value) { 
    if ( value.isbn === isbnValue ) 
    yahoo.push(value); 
    return value; });
    res.send(yahoo);
      resolve("Promise resolved")
    },6000)})
console.log("Before calling promise");
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })

  console.log("After calling promise");  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {       
     
  var listOfauthor = [];
  const authorValue = req.params.author;
  var data = JSON.parse(JSON.stringify(books), function(key, value) { 
    if ( value.author === authorValue ) 
    listOfauthor.push(value); 
    return value; });
    res.send(listOfauthor);
          resolve("Promise resolved")
        },6000)})
    console.log("Before calling promise");
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })
    
      console.log("After calling promise");  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => { 
            var listOftitle = [];
            const titleValue = req.params.title;
            var data = JSON.parse(JSON.stringify(books), function(key, value) { 
              if ( value.title === titleValue ) 
              listOftitle.push(value); 
              return value; });
              res.send(listOftitle);
          resolve("Promise resolved")
        },6000)})
    console.log("Before calling promise");
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })
    
      console.log("After calling promise");  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    var yahoo = [];
    const isbnValue = req.params.isbn;
    var data = JSON.parse(JSON.stringify(books), function(key, value) { 
      if ( value.isbn === isbnValue ) 
      yahoo.push(value);
      return value;
      });
      var valueyahoo = yahoo.map(function(obj){
        return {Reviews:obj.reviews};
        });
    res.send(valueyahoo); 
});

module.exports.general = public_users;
