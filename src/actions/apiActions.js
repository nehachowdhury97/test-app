import axios from "axios";

export function CallWithOutAuth(method, url, body) {
  return new Promise((resolve, reject) => {
    try {
      url = process.env.REACT_APP_API_END_POINT + "" + url;
      if (method === "POST") {
        axios
          .post(url, body)
          .then((response) => {
            //console.log(response)
            if (response.status === 200 || response.status === 201) {
              resolve({ status: true, res: response });
            } else {
              resolve({ status: false, res: response });
            }
          })
          .catch((err) => {
            resolve({ status: false, res: err.response });
          });
      }
      if (method === "PUT") {
        axios
          .put(url, body)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              resolve({ status: true, res: response });
            } else {
              resolve({ status: false, res: response });
            }
          })
          .catch((err) => {
            resolve({ status: false, res: err.response });
          });
      }
      if (method === "DELETE") {
        axios
          .delete(url, body)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              resolve({ status: true, res: response });
            } else {
              resolve({ status: false, res: response });
            }
          })
          .catch((err) => {
            resolve({ status: false, res: err.response });
          });
      }
      if (method === "GET") {
        axios
          .get(url, body)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              resolve({ status: true, res: response });
            } else {
              resolve({ status: false, res: response });
            }
          })
          .catch((err) => {
            resolve({ status: false, res: err.response });
          });
      }
    } catch (err) {
      //console.log("Catch block error in CallWithOutAuth method");
      //console.log(err.response);
      reject(err.response);
    }
  });
}
