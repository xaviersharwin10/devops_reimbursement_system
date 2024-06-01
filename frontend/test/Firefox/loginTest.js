const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const firefox = require('selenium-webdriver/firefox');

async function loginTest() {
    // Set Firefox options if needed
    let firefoxOptions = new firefox.Options();
    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(firefoxOptions)
        .build();
  try {
    // Step # | name | target | value
    // 1 | open | / |
    await driver.get("http://52.71.22.97:3000/");
    // 2 | setWindowSize | 1440x886 |
    await driver.manage().window().setRect({ width: 1440, height: 886 });
    // 3 | click | css=.button2 |
    await driver.findElement(By.css(".button2")).click();
    // 4 | mouseOver | css=.button2 |
    {
      const element = await driver.findElement(By.css(".button2"));
      await driver.actions().move({ origin: element }).perform();
    }
    // 5 | mouseOut | css=.button2 |
    {
      const element = await driver.findElement(By.css("body"));
      await driver.actions().move({ origin: element, x: 0, y: 0 }).perform();
    }
    // 6 | click | css=.inputForm:nth-child(2) > .input |
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).click();
    // 7 | click | css=.inputForm:nth-child(2) > .input |
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).click();
    // 8 | type | css=.inputForm:nth-child(2) > .input | anjanarnair@gmail.com
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).sendKeys("anjanarnair@gmail.com");
    await driver.sleep(1000); // Wait for 1 second
    // 9 | click | css=.inputForm:nth-child(4) > .input |
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).click();
    // 10 | type | css=.inputForm:nth-child(4) > .input | hello@123
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).sendKeys("hello@123");
    await driver.sleep(1000); // Wait for 1 second
    // 11 | click | css=.flex-row input |
    await driver.findElement(By.css(".flex-row input")).click();
    // 12 | click | css=.button-submit |
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

  } finally {
    await driver.quit();
  }
}

loginTest().catch(console.error);
