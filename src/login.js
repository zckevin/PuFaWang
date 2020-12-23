const puppeteer = require("puppeteer");

const headless = true;

async function getToken(username, password) {
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await page.goto("https://static.qspfw.com/xf2020/index.html");
  await page.click(".login");
  await page.waitForNavigation({
    waitUntil: "load",
  });

  await page.type("#username", username);
  await page.type("#password", password);
  await page.click(".login-btn");
  await page.waitForNavigation({
    waitUntil: "load",
  });
  const cookies = await page.cookies();
  // console.log(cookies);
  await browser.close();

  let results = cookies.filter((item) => item.name == "CASTGC");
  if (results.length != 1) {
    console.log("====================================");
    console.log("login failed! ", cookies);
    console.log("====================================");
    return null;
  }
  return results[0].value;
}

exports.getToken = getToken;
