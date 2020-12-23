const db = require("./db").db;
const request = require("./request");

const LevenshteinDistance = function (a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

function searchQuestionText(s) {
  let marks = db.map((item) => LevenshteinDistance(s, item[0]));
  return db[marks.indexOf(Math.min(...marks))];
}

function searchChoice(choices, s) {
  let marks = choices.map((item) => LevenshteinDistance(s, item));
  const ABCD = "ABCD";
  return ABCD[marks.indexOf(Math.min(...marks))];
}

function formatQuestions(arr) {
  arr.forEach((item) => {
    item.choices = item.answerOption.split("@!@").filter((_) => _);
  });
}

function getAnswers(questions) {
  formatQuestions(questions);

  let answers = questions.map((item) => {
    // [title, choice]
    let [q, choice] = searchQuestionText(item.title);
    console.log(item.title);
    console.log(item.choices);
    console.log(q, choice, searchChoice(item.choices, choice));
    console.log("=============================================");
    return `${item.id}_${searchChoice(item.choices, choice)}`;
  });
  console.log(answers);
  return answers;
}

function generateUrl(questionsId, resultId, answers) {
  const answersFormatted = answers.join("@!@");
  return `https://test.qspfw.com/exam/paper/saveResult?taskId=20&code=${questionsId}&resultId=${resultId}&answers=${answersFormatted}@!@&takeTime=257`;
}

async function run(token) {
  let obj = await request.fetchJSONWithToken(
    "https://test.qspfw.com/exam/paper/getPaper?taskId=20",
    token
  );
  if (obj.status != "0") {
    console.error(obj);
    return;
  }
  let questionsId = obj.data.paper.code;
  let resultId = obj.data.resultId;

  let body = await request.fetchPlainText(
    `https://testpaper-10010343.file.myqcloud.com/xianfa2020/${questionsId}.txt`
  );
  let questions = JSON.parse(body);

  let answers = getAnswers(questions);
  await request.fetchJSONWithToken(
    generateUrl(questionsId, resultId, answers),
    token
  );
  console.log(
    await request.fetchJSONWithToken(
      "https://test.qspfw.com/exam/paper/getResultInfo?taskId=20",
      token
    )
  );
}

async function queryScore(token) {
  let obj = await request.fetchJSONWithToken(
    "https://test.qspfw.com/exam/paper/getResultInfo?taskId=20",
    token
  );
  if (obj.data.maxScore < 60) {
    console.log(obj);
  }
  return obj.data.maxScore;
}

exports.final_test = run;
exports.queryScore = queryScore;
