const axios = require("axios");

const DEFAULT_POST_HEADER = {
  "content-type": "application/json"
};

const get = (url, params = {},headers) =>
  new Promise((resolve, reject) => {
    let opts = {
      method: "get",
      url,
      params,
      headers
    };
    axios(opts)
      .then(resolve)
      .catch(reject);
  });

const post = (url, data = {}, headers = DEFAULT_POST_HEADER) =>
  new Promise((resolve, reject) => {
    switch (headers["content-type"]) {
      case "application/json":
        data = JSON.stringify(data);
        break;
      case "application/x-www-form-urlencoded":
        data = Object.entries(data)
          .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
          .join("&");
        break;
      default:
        break;
    }

    axios
      .post(url, data, {
        headers
      })
      .then(resolve)
      // .then((hasil)=>{
      //     console.log(`status : ${hasil.status} info: ${hasil.statusText}`)
      //   return resolve(hasil.statusText)
      // })
      .catch(reject);
  });

const put = (url, data = {}, headers = DEFAULT_POST_HEADER) =>
  new Promise((resolve, reject) => {
    switch (headers["content-type"]) {
      case "application/json":
        data = JSON.stringify(data);
        break;
      case "application/x-www-form-urlencoded":
        data = Object.entries(data)
          .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
          .join("&");
        break;
      default:
        break;
    }

    axios
      .put(url, data, {
        headers
      })
      //.then(resolve)
      .then((hasil)=>{
          console.log(`status : ${hasil.status} info: ${hasil.statusText}`)
        return resolve(hasil)
      })
      .catch(reject);
  });

module.exports = {
  get,
  post,
  put,
};
