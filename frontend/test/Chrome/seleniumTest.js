const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

(async function example() {
    let edgeOptions = new edge.Options();
    let driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(edgeOptions)
      .build();
    
     await driver.get('http://52.71.22.97:3000/');
    let loginBtn = await  driver.findElement(By.xpath('//*[@id="root"]/div/nav/div/button'));
    await loginBtn.click();
    let emailInput = await  driver.findElement(By.xpath('//*[@id="model-box"]/div/form/div[2]/input'));
    await emailInput.sendKeys('sharwinxavier.23it@licet.ac.in',Key.RETURN);
    let passwordInput = await  driver.findElement(By.xpath('//*[@id="model-box"]/div/form/div[4]/input'));
    await passwordInput.sendKeys('test',Key.RETURN);

    let button = await driver.wait(
        until.elementLocated(By.xpath("//button[text()='Add Expense']")),
        10000
    );
   
    await driver.wait(until.elementIsVisible(button), 10000);

      // Click the button
      await button.click();
    let input = await  driver.findElement(By.xpath('//*[@id="model-box"]/div/form/div[2]/input'));
    let placeholderText = await input.getAttribute('placeholder');
    if(placeholderText === "Enter expense heading"){
        console.log("Success");
    }
    else{
        console.log("Cant open");
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    await driver.quit();
    
    })();


//   async function createTask(driver, taskName, descName, categoryName) {
//     try {
   
        
//     }
//     catch(e){
//         console.log(e);
//       }
//        finally {
//         // await driver.quit();
//       }
//   }
  
//   async function searchTask(driver, search) {
//     // try {
//         let inputField = await driver.findElement(By.xpath("/html/body/div[1]/main/div[1]/div/input"));
//         await inputField.sendKeys(search, Key.RETURN);
//         await driver.sleep(500);
//     }
//     catch(e){
//         console.log(e);
//       }
//        finally {
//         // await driver.quit();
//       }
//   }
