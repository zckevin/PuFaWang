const fetch = require("node-fetch");

async function fetchJSONWithToken(url, token) {
  let resp = await fetch(url, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "access-token": token,
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      source: "WEB",
    },
    referrer: "https://static.qspfw.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
  });
  let jsonObj = await resp.json();
  return jsonObj;
}

async function fetchPlainText(url, token) {
  let resp = await fetch(url, {
    headers: {
      accept: "text/plain, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
    },
    referrer: "https://static.qspfw.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
  });
  let text = await resp.text();
  return text;
}

exports.fetchJSONWithToken = fetchJSONWithToken;
exports.fetchPlainText = fetchPlainText;
