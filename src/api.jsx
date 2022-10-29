import Axios from "axios";
import Csrf from "./csrf.jsx";
import history from "./history.jsx";

const baseUrl = process.env.REACT_APP_ODOO_URL;

Axios.interceptors.response.use(async function (response) {
  if (response.data.csrf) {
    Csrf.value = response.data.csrf;
  }

  if (response.status === 400) {
    apiGet("/ping");
    if (response.config.method === "post") {
      const resp = await Axios.post(response.config.url, response.config.data);
      return resp
    }
  }
  if (response.status === 401) {
    history.push("/login");
  }
  return response;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
})

const apiGet = async (url) => {
  try {
    const res = await Axios.get(
      `${baseUrl}${url}`,
      {
        headers: {
          'Accept': 'application/json text/html',
        },
        validateStatus: () => true
        ,
        data: null
      });
    return res
  } catch (err) {
    return err.response;
  }
}

const apiPost = async (url, body) => {
  try {
    const res = await Axios.post(
      `${baseUrl}${url}`,
      body,
      {
        headers: {
          'Accept': 'application/json, text/html',
          'Content-Type': 'application/json',
          'Csrf-Token': Csrf.value
        },
        validateStatus: () => true
      });
    return res
  } catch (err) {
    console.log("apiPost Error");
    console.log(err);
    return err.response$;
  }
}

const apiPostClassic = async (url, body) => {
  try {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(body)) {
      params.append(key, value)
    }

    params.append('csrf_token', Csrf.value)
    const res = await Axios.post(`${baseUrl}${url}`, params);
    return res
  } catch (err) {
    return err.response;
  }
}

export { apiGet, apiPost, apiPostClassic };