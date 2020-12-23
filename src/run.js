const getToken = require("./login").getToken;
const learn = require("./learn").learn;
const final_test = require("./final_test").final_test;
const queryScore = require("./final_test").queryScore;

const students = require('./students-example').students;
// const students = require('./students').students;

async function doit(username) {
  let token = await getToken(username, "123456");
  if (token) {
    console.log(await queryScore(token));
    await learn(token);
    await final_test(token);
  }
}

(async function () {
  for (const username of students) {
    await doit(username);
  }
})();
