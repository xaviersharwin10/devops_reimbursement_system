const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const edge = require('selenium-webdriver/chrome');

(async function signupTest() {
  let driver;

  try {
    // Set up the driver
    let edgeOptions = new edge.Options();
    let driver = await new Builder()
      .forBrowser('chrome')
      .setEdgeOptions(edgeOptions)
      .build();

    // Define a timeout
    const timeout = 30000;

    // Start the test
    await driver.manage().setTimeouts({ implicit: timeout });

    // Step 1: Open the website
    await driver.get("http://52.71.22.97:3000/");

    // Step 2: Set window size
    await driver.manage().window().setRect({ width: 1440, height: 886 });

    // Step 3: Click on the button
    await driver.findElement(By.css(".button2")).click();

    // Step 4: Click on the span
    await driver.findElement(By.css(".span:nth-child(1)")).click();

    // Step 5: Click on the input field
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).click();

    // Step 6: Type the name "Anjana"
    await driver.findElement(By.css(".inputForm:nth-child(2) > .input")).sendKeys("Anjana");
    await driver.sleep(1000); // Wait for 1 second
    // Step 7: Click on the email input field
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).click();

    // Step 8: Type the email "anjanarnair@gmail.com"
    await driver.findElement(By.css(".inputForm:nth-child(4) > .input")).sendKeys("anjanarnair@gmail.com");
    await driver.sleep(1000); // Wait for 1 second
    // Step 9: Click on the password input field
    await driver.findElement(By.css(".inputForm:nth-child(6) > .input")).click();

    // Step 10: Type the password "hello@123"
    await driver.findElement(By.css(".inputForm:nth-child(6) > .input")).sendKeys("hello@123");
    await driver.sleep(1000); // Wait for 1 second
    // Step 11: Click on the checkbox
    await driver.findElement(By.css(".flex-row input")).click();

    // Step 12: Click on the submit button
    await driver.findElement(By.css(".button-submit")).click();

    // You can add assertions here to verify the result if needed
    // Example:
    // let successMessage = await driver.findElement(By.css('.success-message')).getText();
    // assert.strictEqual(successMessage, 'Expected Success Message');

  } catch (error) {
    console.error('Error during the signup test:', error);
  } finally {
    // Quit the driver
    if (driver) {
      await driver.quit();
    }
  }
})();
