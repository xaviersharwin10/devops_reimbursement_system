const { Builder, By, Key, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const assert = require('assert');
const path = require('path');  // Import the path module

async function submitClaimTest() {

  new edge.Options().headless(); // Enable headless mode
  new edge.Options().addArguments('--disable-gpu');

  let driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setChromeOptions(new edge.Options())
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


    // Wait for the button to be visible
    let button = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/main/section[2]/div[2]/button')), 10000);

    // Scroll the button into view
    await driver.executeScript("arguments[0].scrollIntoView(true);", button);

    // Click the button
    await button.click();
    // 3 | click | css=.inputForm:nth-child(2) > .input |
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).click();
    // 4 | type | css=.inputForm:nth-child(2) > .input | Travel To Kerala
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).sendKeys("Travel To Kerala");
    await driver.sleep(1000); // Wait for 1 second
    // 5 | click | css=.inputForm:nth-child(4) > .input |
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).click();
    // 6 | type | css=.inputForm:nth-child(4) > .input | travel done to go to hometown
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).sendKeys("travel done to go to hometown");
    await driver.sleep(1000); // Wait for 1 second
    // 7 | click | css=.inputForm:nth-child(6) > .input |
    await driver.findElement(By.css(".inputForm:nth-child(6) > .input")).click();
    // 8 | click | css=div:nth-child(1) > .inputForm > .input |
    await driver.findElement(By.css("div:nth-child(1) > .inputForm > .input")).click();
    // 9 | click | css=.inputForm:nth-child(6) > .input |
    await driver.findElement(By.css(".inputForm:nth-child(6) > .input")).click();
    // 10 | type | css=.inputForm:nth-child(6) > .input | 250
    await driver.findElement(By.css(".inputForm:nth-child(6) > .input")).sendKeys("250");
    await driver.sleep(1000); // Wait for 1 second
    // Wait for the date input to be visible
    let dateInput = await driver.wait(until.elementLocated(By.css('input[type="date"]')), 10000);

        // Set the date value directly
    await dateInput.sendKeys('15-05-2024');
    await driver.sleep(1000); // Wait for 1 second
    // 15 | click | css=div:nth-child(2) > .inputForm > .input |
    await driver.findElement(By.css("div:nth-child(2) > .inputForm > .input")).click();
    // 16 | type | css=div:nth-child(2) > .inputForm > .input | Travel
    await driver.findElement(By.css("div:nth-child(2) > .inputForm > .input")).sendKeys("Travel");
    await driver.sleep(1000); // Wait for 1 second
    // 17 | click | css=div:nth-child(9) .input |
    // Wait for the file input to be visible
    let fileInput = await driver.wait(until.elementLocated(By.css('input[type="file"]')), 10000);

    // Prepare the file path
    const filePath = path.resolve("travel-bill.jpg"); // Change this to your file's path
  // Send keys to upload the file
  await fileInput.sendKeys(filePath);
  await driver.sleep(10000); // Wait for 1 second

    // 19 | click | css=.button-submit |
    let submitButton = await driver.wait(until.elementLocated(By.css(".button-submit")), 10000);
    await submitButton.click();
    // 20 | click | css=.react-confirm-alert-button-group > button:nth-child(1) |\
    let confirmButton = await driver.wait(until.elementLocated(By.css('.react-confirm-alert-button-group > button:nth-child(1)')), 100000);
    await confirmButton.click();
    await driver.sleep(1000); // Wait for 1 second

//    // Add assertions or further steps as needed

    let notificationButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div/div/div')), 100000);
    let notificationText = await notificationButton.getText();
    console.log('Notification Text:', notificationText);

    // Optionally, you can assert the text of the notification
    if (notificationText.includes('Expense added successfully')) {
        console.log('Notification captured successfully');
    } else {
        console.error('Failed to capture notification text correctly');
    }
  } finally {
    await driver.quit();
  }
}

submitClaimTest().catch(console.error);
