// for 7th grade(aka 初一)
// modify array `tasks` in function `run()` for other grades

const fetch = require("node-fetch");

function gen_study_id(token, name, id) {
  return [
    `https://test.qspfw.com/practice/${name}?${
      name == "studyByChapterId" ? "chapter" : "column"
    }Id=${id}&sourceId=2`,
    {
      headers: {
        accept: "*/*",
        "accept-language":
          "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,da;q=0.5,zh-TW;q=0.4",
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
      credentials: "omit",
    },
  ];
}

async function run(token) {
  let tasks = [
    ["studyByColumnId", 39],
    ["practice", 39],
    ["studyByColumnId", 73],
    ["studyByChapterId", 158],
    ["studyByChapterId", 159],
    ["studyByChapterId", 160],
    ["practice", 73],
    ["studyByColumnId", 40],
    ["practice", 40],
    ["studyByColumnId", 75],
    ["studyByChapterId", 162],
    ["studyByChapterId", 163],
    ["studyByChapterId", 164],
    ["studyByChapterId", 165],
    ["practice", 75],
    ["studyByColumnId", 76],
    ["studyByChapterId", 167],
    ["studyByChapterId", 168],
    ["practice", 76],
    ["studyByColumnId", 77],
    ["studyByChapterId", 170],
    ["studyByChapterId", 171],
    ["studyByChapterId", 172],
    ["practice", 77],
  ];
  for (const task of tasks) {
    let resp = await fetch.apply(null, gen_study_id.call(null, token, ...task));
    let body = await resp.json();
    // console.log(body);
  }
}

exports.learn = run;
