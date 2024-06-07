const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const path = require('path');
const browsers = ['firefox', 'MicrosoftEdge', 'chrome'];
const gridUrl = 'http://localhost:4444/wd/hub';

async function submitClaimTest(browser) {
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


    // Wait for the button to be visible
    let button = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/main/section[2]/div[2]/button')), 10000);

    // Scroll the button into view
    await driver.executeScript("arguments[0].scrollIntoView(true);", button);

    // Click the button
    await button.click();
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).click();
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).sendKeys("Travel To Kerala");
    await driver.sleep(1000); // Wait for 1 second
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).click();
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).sendKeys("travel done to go to hometown");
    await driver.sleep(1000); // Wait for 1 second
    await driver.findElement(By.css(".inputForm:nth-child(6) > .input")).click();
    await driver.findElement(By.css("div:nth-child(1) > .inputForm > .input")).click();
    await driver.findElement(By.css(".inputForm:nth-child(6) > .input")).click();
    await driver.findElement(By.css(".inputForm:nth-child(6) > .input")).sendKeys("250");
    await driver.sleep(1000); // Wait for 1 second
    // Wait for the date input to be visible
    let dateInput = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div/form/div[7]/div[1]/div[2]/input')), 10000);
    // Set the date value directly
    if(browser == "firefox")
    {
        await dateInput.sendKeys('2024-05-15');
    }
    else
    {
        await dateInput.sendKeys('15-05-2024');
    }
    await driver.sleep(1000); // Wait for 1 second
    await driver.findElement(By.css("div:nth-child(2) > .inputForm > .input")).click();
    await driver.findElement(By.css("div:nth-child(2) > .inputForm > .input")).sendKeys("Travel");
    await driver.sleep(1000); // Wait for 1 second
    // Wait for the file input to be visible
    let fileInput = await driver.wait(until.elementLocated(By.css('input[type="file"]')), 10000);

    // Prepare the file path
    const filePath = path.resolve("travel-bill.jpg"); // Change this to your file's path
  // Send keys to upload the file
  await fileInput.sendKeys(filePath);
  await driver.sleep(10000); // Wait for 1 second

    let submitButton = await driver.wait(until.elementLocated(By.css(".button-submit")), 10000);
    await submitButton.click();
    let confirmButton = await driver.wait(until.elementLocated(By.css('.react-confirm-alert-button-group > button:nth-child(1)')), 100000);
    await confirmButton.click();
    await driver.sleep(1000); // Wait for 1 second

  // Add assertions or further steps as needed

    let notificationButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div/div/div')), 100000);
    let notificationText = await notificationButton.getText();
    console.log('Notification Text:', notificationText);

    // Optionally, you can assert the text of the notification
    if (notificationText.includes('Expense added successfully')) {
        console.log('Notification captured successfully');
    } else {
        console.error('Failed to capture notification text correctly');
    }
   }  catch (error) {
        console.error('Error:', error);
    }finally {
    await driver.quit();
  }
}

(async function() {
  await Promise.all(browsers.map(browser => submitClaimTest(browser)));
})();