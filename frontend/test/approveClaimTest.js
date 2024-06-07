const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

const browsers = ['firefox', 'MicrosoftEdge', 'chrome'];
const gridUrl = 'http://localhost:4444/wd/hub';

async function approvalManagerTest(browser) {
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
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).sendKeys("sharwinxavier.23it@licet.ac.in");
    await driver.sleep(1000); // Wait for 1 second
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).click();
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).sendKeys("test");
    await driver.sleep(1000); // Wait for 1 second
    await driver.findElement(By.css(".flex-row input")).click();
    await driver.findElement(By.css(".button-submit")).click();
    await driver.sleep(10000); // Wait for 10 second

    let employeeExpensesButton = await driver.wait(until.elementLocated(By.css(".tabs [for='radio-2']")), 100000);
    await employeeExpensesButton.click();
    await driver.sleep(1000); // Wait for 1 second
    let pendingCheck = await driver.wait(until.elementLocated(By.css("input[type='checkbox'][value='pending']")), 1000);
    await pendingCheck.click();
    await driver.sleep(8000); // Wait for 8 second

    var action = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div/main/section[2]/div[2]/div/div[3]/table/tbody/tr[1]/td[7]")), 1000);
    await action.click();
    var accept = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div/main/section[2]/div[2]/div/div[3]/table/tbody/tr[1]/td[7]/div/button[1]")), 1000);
    await accept.click();
    await driver.sleep(10000);

    let confirmButton = await driver.wait(until.elementLocated(By.css('.react-confirm-alert-button-group > button:nth-child(1)')), 100000);
    await confirmButton.click();
    await driver.sleep(2000); // Wait for 1 second
    let notificationButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div/div/div')), 10000);
    let notificationText = await notificationButton.getText();
    console.log(browser + 'Notification Text:', notificationText);
    await driver.sleep(5000); // Wait for 1 second

    // Optionally, you can assert the text of the notification
    if (notificationText.includes('Expense updated successfully')) {
        console.log('Notification captured successfully');
    } else {
        console.error('Failed to capture notification text correctly');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

(async function() {
  await Promise.all(browsers.map(browser => approvalManagerTest(browser)));
})();