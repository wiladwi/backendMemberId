const dotenv = require("dotenv");
const path = require("path");

const { format, transports } = require("winston");
require("winston-daily-rotate-file");
dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  serviceName: process.env.SERVICE_NAME,
  urlDb: process.env.MONGO_URL_DEV,
  jwtKey: process.env.SECRET_TOKEN,
  emailUrl: process.env.EMAIL_URL,

  logger: {
    dir: "",
    config: {
      // change level if in dev environment versus production
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      exitOnError: false,
      transports: [
        new transports.Console({
          level: "silly",
          format: format.combine(
            format.colorize(),
            format.printf(
              info => `${info.timestamp} ${info.level}: ${info.message}`
            )
          )
        }),
        new transports.DailyRotateFile({
          filename: "logs/%DATE%-results.log",
          zippedArchive: true,
          datePattern: "YYYY-MM-DD"
        })
      ]
    }
  },

  thumbnailOption: {
    percentage: 10,
    // width: 10,
    // height: 10,
    responseType: "buffer"
  },

  i18n: {
    locales: ["en"],
    directory: "locales",
    languageHeaderField: "lan",
    defaultLocale: "en",
    autoReload: true,
    updateFiles: false
  },

  zoom :{
    api_key:process.env.ZOOM_API_KEY,
    api_secret:process.env.ZOOM_API_SECRET,
    url:process.env.ZOOM_URL,
  },

  fileStore: {
    image: process.env.FILE_STORE_IMAGES,
    file: process.env.FILE_STORE_FILES,
    video: process.env.FILE_STORE_VIDEOS,
  }
};
