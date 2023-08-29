const Awards = require('../../models/Awards');
var mongoose = require('mongoose');
const fs = require("fs");
const config = require("../../config");
const { v4: uuidv4 } = require("uuid");
const logger = require("./../../utils/logger");
const ObjectID = require('mongodb').ObjectID;

module.exports = {

  findList: async (req, res) => {
    let findQuery  = {};
    const getAwards = () => 
      new Promise (async(resolve, reject) => {
       findQuery  = {
          $match: {
            type: {
              $ne: ''
            }
          }
        } 

     for (const key in req.query) {
          switch (key) {
            case "type":
              const query = req.query.type;
              if(Array.isArray(req.query.type)) {
                findQuery = {
                  $match:{
                    type: {$in:query}
                  }
                 
                }
              } else {
                findQuery  = {
                  $match: {
                    type: {
                      $eq: query
                    }
                  }
                }
              }

              break;
            case "minPoint":
              findQuery = {
                ...findQuery,
                $match: {
                  ...findQuery.$match,
                  point: { $gte: +req.query.minPoint, $lte: +req.query.maxPoint }
                }
              };

              break;
            default:
              break;
          }
        }

        console.log(req.query.type)

       await Awards.aggregate([
          findQuery
       ])
        .then(async(data) =>{
          return resolve(data)
        })
        .catch((err) =>{
          reject(err)
        })
      })

    return getAwards()
    .then((data) =>{
      logger.info(`Get Award successfully`)
      res
      .status(200)
      .json({data: data})
    })
    .catch((err) => {
      logger.info(err)
      switch (err.code) {
        case 401:
          res
          .status(401)
          .send({ message: err.message });
        break
        default:
          res.status(500).json({ message: 'internal error' });
        break;

      }

    })
  },
};
