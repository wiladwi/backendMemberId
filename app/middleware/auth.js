const config = require("../../config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { reject } = require("bcrypt/promises");
const logger = require("./../../utils/logger");
module.exports = {
  
  isLogin: async (req, res, next) => {
    const cekHeader = () => 
      new Promise(async(resolve, reject) => {
        if (! req.headers.authorization) return reject ({ message:  {code: 401, content: "Not Authorize" }})
        const token = req.headers.authorization.replace("Bearer ", "");

        const data = jwt.verify(token, config.jwtKey, (err, decode)=>{
                        if(err){
                          return reject({ message:  {code: 401, content: "Not Authorize" }})
                        }else{
                            return decode;
                        }
                    })
        if (!data) return reject({ message:  {code: 401, content: "Not Authorize" }})

         await User.findOne({ _id: data.user.id })
        .then((user) => {
          if (!user) {
            return reject({ message:  {code: 401, content: "Not Authorize" }})
          }
          req.user = user;
          req.token = token;
          return resolve()
        })

        .catch((err) => {
          const token = req.headers.authorization
          reject(err)
        })

      })

      return cekHeader()
      .then(() => {
        next()
      })
      .catch((err) =>{
        logger.error(`Find User => ${JSON.stringify(err)}`)
        switch (err.message.code) {
          case 400:
             res
              .status(400)
              .send({ message: err.message.content });
          break
          case 401:
            res
             .status(401)
             .send({ message: err.message.content });
         break
          case 412:
            res
            .status(404)
            .send({ message: err.message.content });
          break;
          default:
              res.status(500).json({ message: 'internal error' });
          break;
  
        }
      })
  },
};
 