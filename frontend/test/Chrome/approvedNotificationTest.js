const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

async function approvedNotificationTest() {
  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    await driver.manage().window().setRect({ width: 1440, height: 886 });

    await driver.get("http://52.71.22.97:3000/");
    await driver.manage().window().setRect({ width: 1440, height: 886 });
      // 3 | click | css=.button2 |

    //the manager logs in and accepts the user's expense claim
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
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).sendKeys("sharwinxavier.23it@licet.ac.in");
    await driver.sleep(1000); // Wait for 1 second
      // 9 | click | css=.inputForm:nth-child(4) > .input |
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).click();
      // 10 | type | css=.inputForm:nth-child(4) > .input | hello@123
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).sendKeys("test");
    await driver.sleep(1000); // Wait for 1 second
      // 11 | click | css=.flex-row input |
    await driver.findElement(By.css(".flex-row input")).click();
      // 12 | click | css=.button-submit |
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
    await driver.sleep(3000); // Wait for 10 second


    //the manager logs out
    let logoutButton = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div/nav/div/div[2]/button[2]")), 10000);
    await logoutButton.click();
    await driver.sleep(3000); // Wait for 10 second

    //the user logs in
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

    //lets the user click the notifications button, press the notification, and mark that as read
    let notiButton = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div/nav/div/div[1]/button")), 10000);
    await notiButton.click();
    // Wait until the "Mark as read" element is located
    let markAsReadElement = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div/nav/div/div[1]/div/div[2]/div[1]/div/p[1]")), 10000);
   // Wait until the "Mark as read" element is visible
    await driver.wait(until.elementIsVisible(markAsReadElement), 10000);
    // Click the "Mark as read" element
    await markAsReadElement.click();
    await driver.sleep(3000); // Wait for 10 second

    let submitConfirmButton = await driver.wait(until.elementLocated(By.css('.react-confirm-alert-button-group > button:nth-child(1)')), 100000);
    await submitConfirmButton.click();
    await driver.sleep(1000); // Wait for 1 second

    let notificationButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div/div/div')), 100000);
    let notificationText = await notificationButton.getText();
    console.log('Notification Text:', notificationText);

    // Optionally, you can assert the text of the notification
    if (notificationText.includes('Notification marked as read')) {
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

approvedNotificationTest();
