const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

const browsers = ['firefox', 'MicrosoftEdge', 'chrome'];
const gridUrl = 'http://localhost:4444/wd/hub';

async function loginTest(browser) {
  let driver;
  try {
    driver = await new Builder().usingServer(gridUrl).forBrowser(browser).build();
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 1440, height: 886 });
    await driver.findElement(By.css(".button2")).click();
    {
      const element = await driver.findElement(By.css(".button2"));
      await driver.actions().move({ origin: element }).perform();
    }
    {
      const element = await driver.findElement(By.css("body"));
      await driver.actions().move({ origin: element, x: 0, y: 0 }).perform();
    }
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).click();
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).click();
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).sendKeys("anjanarnair@gmail.com");
    await driver.sleep(1000); // Wait for 1 second
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).click();
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).sendKeys("hello@123");
    await driver.sleep(1000); // Wait for 1 second
    await driver.findElement(By.css(".flex-row input")).click();
    await driver.findElement(By.css(".button-submit")).click();
    await driver.sleep(10000); // Wait for 10 second
    // Add assertions or further steps as needed

    let nameButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/nav/div/div[2]/button[1]')), 100000);
    let notificationText = await nameButton.getText();
    console.log('Notification Text:', notificationText);

    // Optionally, you can assert the text of the notification
    if (notificationText.includes('Anjana')) {
        console.log('Login is correct');
    } else {
        console.error('Login is not correct');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  finally {
    if (driver) {
          await driver.quit();
        }
  }
}

(async function() {
  await Promise.all(browsers.map(browser => loginTest(browser)));
})();
