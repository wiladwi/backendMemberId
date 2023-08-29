const User = require("../../models/User");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectID = require('mongodb').ObjectID;
const { resolve } = require("path");
const { rejects } = require("assert");
const logger = require("./../../utils/logger");
const { v4: uuidv4 } = require("uuid");


let values = {
  google: null,
};
let googleUser= null;

let updateValue = obj => {
  for (const key in obj) if (obj.hasOwnProperty(key)) values[key] = obj[key];
};

const getOldToken = async (id) => {
  const tokenId = await User.findById(id)
  if(tokenId) return tokenId.token
  return '0';
}

module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body;
      const cekUser = await User.find({username:payload.username})

      if(cekUser.length > 0) {
        return res.status(401).json({message: {code: 401, message: 'username already exist'}});
      }
      let user = new User({...payload});
        await user.save()
          .then(async(result)=>{
            delete user._doc.password;
            res.status(201).json({ code: 201, data: result });
           })
          .catch((err) =>{
            return res.status(422).json({
              error: 1,
              message: {message:err.message, code:422 }, 
              fields: err.errors,
             });
        })
    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: {message:err.message, code:422 },  
          fields: err.errors,
        });
      }
    }
  },

  signin: async (req, res, next) => { 
    const { email, password } = req.body;
    User.findOne({$or: [{'email': email}, {'username': email}]})
      .then(async (user) => {
        if (user) {
            const token =  jwt.sign(
               {
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  name: user.name,
                  },
                },
                config.jwtKey,
                {expiresIn: "24h"},
            );
            res
            .status(200)
            .json({ status: 200, token: token}); 
        } else {
            res
            .status(403)
            .json({ status: 403, message: `Your email doesn't exist` });        
        } 
        
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: err.message || `Internal serve error` });
       //  next();
      });
  },
};
