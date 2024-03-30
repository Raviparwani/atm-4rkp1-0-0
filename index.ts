#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

function displayAsciiArt(name:string) {
  console.log(chalk.yellow.bold("                             Welcome to My ATM "));
  console.log(chalk.yellow.bold("                                   Author "));
  console.log(chalk.yellow.bold("RRRRRRRRRRRRRRRRR                                           iiii  "));
  console.log(chalk.yellow.bold("R::::::::::::::::R                                         i::::i")); 
  console.log(chalk.yellow.bold("R::::::RRRRRR:::::R                                         iiii"));  
  console.log(chalk.yellow.bold("RR:::R      R:::::R                                                "));
  console.log(chalk.yellow.bold("R::::R      R:::::R  aaaaaaaaaaaaavvvvvvv           vvvvvvviiiiii "));
  console.log(chalk.yellow.bold("R::::R     R:::::R  a::::::::::::av:::::v         v:::::v  i::::i "));
  console.log(chalk.yellow.bold("R::::RRRRRR:::::R   aaaaaaaaa:::::av:::::v       v:::::v   i::::i "));
  console.log(chalk.yellow.bold("R:::::::::::::RR             a::::a v:::::v     v:::::v    i::::i "));
  console.log(chalk.yellow.bold("R::::RRRRRR:::::R      aaaaaaa:::::a  v:::::v   v:::::v    i::::i "));
  console.log(chalk.yellow.bold("R::::R     R:::::R  aa: :::::::::::a   v:::::v v:::::v     i::::i "));
  console.log(chalk.yellow.bold("R::::R      R:::::R a::::aaaa::::::a    v:::::v:::::v      i::::i "));
  console.log(chalk.yellow.bold("R::::R       R:::::Ra::::a   a:::::a     v:::::::::v       i::::i "));
  console.log(chalk.yellow.bold("RR:::R       R:::::Ra::::a   a:::::a      v:::::::v        i::::i"));
  console.log(chalk.yellow.bold("R::::R       R:::::Ra:::::aaaa:::::a       v:::::v         i:::::i"));
  console.log(chalk.yellow.bold("R::::R       R:::::R a:::::::::a:::a        v:::v          i:::::i"));
  console.log(chalk.yellow.bold("RRRRRR       RRRRRRR  aaaaaaaaaaaaaa         vvv           iiiiiii"));
  console.log(chalk.red.bold("                                     PARWANI "));                                                       
}
async function main() {
// Initialize ATM balance and PIN
let myBalance = 10000;
// let myPin = 1234;
let myPin;

// it a method where you can enter your saved pin ,
//Prompt the user to enter their PIN
// let pinAnswer = await inquirer.prompt([
//   {
//     name: "pin",
//     message: "Enter your pin number",
//     type: "number",
//   },
// ]);

// Prompt user to creat & enter PIN
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Create your PIN number",
        type: "password", // To hide PIN input
    },
    {
        name: "enterPin",
        message: "Enter your PIN number",
        type: "password", // To hide PIN input
    },
]);

// Check if the entered PINs match
if (pinAnswer.pin === pinAnswer.enterPin) {
    myPin = pinAnswer.pin;
    console.log(chalk.green.bold("PIN successfully set."));
    console.log(chalk.green.bold("Welcome! Your PIN has been set successfully."));
} else {
    console.log(chalk.red.bold("PIN do not match. Please enter correct PIN."));
    return; // Exit the program if PINs do not match
}



// Check if the entered PIN is correct
if (pinAnswer.pin === myPin) {
  console.log(chalk.green.bold("Correct pin code."));
  displayAsciiArt("Ravi");
  // Prompt the user to select an operation
  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      message: "Please select option",
      type: "list",
      choices: [
        { name: chalk.hex("cc00cc").bold("withdraw"), value: "withdraw" },
        { name: chalk.yellow.bold("fast cash"), value: "fast cash" },
        { name: chalk.bold.hex("ff8000")("deposit"), value: "deposit" },
        { name: chalk.green.bold("easypaisa"), value: "easypaisa" },
        { name: chalk.blue.bold("check balance"), value: "check balance" },
      ],
      //["withdraw", "fast cash", "check balance"],
    },
  ]);

  console.log(operationAns);

  // Perform the selected operation
  if (operationAns.operation === "withdraw") {
    let amountAns = await inquirer.prompt([
      {
        name: "amount",
        message: "Enter your amout",
        type: "number",
      },
    ]);

    // Check if withdrawal amount exceeds available balance
      if(amountAns.amount > "50000"){ console.log(chalk.red.bold("Sorry, but you've reached the daily withdrawal limit of 20,000. Further withdrawals are currently not possible."));

      }else if (amountAns.amount > myBalance) {
      console.log(
        chalk.red.bold(
          "Insufficient funds, Yoy can't withdraw more then your current balance "
        )
      );
    } else {
      myBalance -= amountAns.amount;
      console.log(
        chalk.hex("cc00cc").bold("Your remaining balance is >-----> ") +
          chalk.red.bold(myBalance)
      );
      
    }   

      } else if (operationAns.operation === "check balance") {
    console.log(
      chalk.blue.bold("Your Balance is >-----> ") + chalk.cyan.bold(myBalance)
    );

    // Handle fast cash operation
    // Add your fast cash logic here
  } else if (operationAns.operation === "fast cash") {
    let fastCashAmount = await inquirer.prompt([
      {
        name: "amount",
        message: "Select fast cash amount",
        type: "list",
        choices: [
          { name: chalk.hex("ff8000").bold("1000"), value: "1000" },
          { name: chalk.hex("ff8000").bold("2000"), value: "2000" },
          { name: chalk.hex("ff8000").bold("3000"), value: "3000" },
          { name: chalk.hex("ff8000").bold("4000"), value: "4000" },
          { name: chalk.hex("ff8000").bold("5000"), value: "5000" },
        ],
        // you can also use this method to creat simple list : ["1000", "2000", "3000", "4000", "5000"],
      },
    ]);
    if (parseInt(fastCashAmount.amount) > myBalance) {
      console.log(
        chalk.red.bold(
          "Insufficient funds, You can not withdraw more then your current balance "
        )
      );
    } else {
      myBalance -= parseInt(fastCashAmount.amount);
      console.log(
        chalk.yellow.bold("Your remaining balance is >-----> ") +
          chalk.hex("ff8000").bold(myBalance)  // Display the current balance
      );                                       
    } 
  }  
  else if (operationAns.operation === "deposit") {
    let depositAmt = await inquirer.prompt([
      {
        name: "amount",
        message: "Enter the amount you want to deposit",
        type: "number",
      },
    ]);

    // Deposit logic
    myBalance += depositAmt.amount;
    console.log(
      chalk.green.bold.hex("ff8000")("Deposit successful. Your new balance is >-----> ") +
        chalk.cyan.bold(myBalance)
    );   
    // EasyPaisa
  }  else if (operationAns.operation === "easypaisa") {
    let epAns = await inquirer.prompt([
      {
        name: "amount",
        message: "Enter your amout",
        type: "number",
      },
      {
        name: "accountNumber",
        message: "Enter EasyPaisa Account Number",
        type: "input",
      },
    ]);

    // Check if easypaisa amount exceeds available balance
      if(epAns.amount > "50000"){ console.log(chalk.red.bold("Sorry, but you've reached the daily sending limit of 50,000. Further sendigs are currently not possible."));

      }else if (epAns.amount > myBalance) {
      console.log(
        chalk.red.bold(
          "Insufficient funds, Yoy can't send more then your current balance "
        )
      );
    } else {
      myBalance -= epAns.amount;
      console.log("Amount Successfully Sent to EasyPaisa Account Number")
      console.log(chalk.green.bold("Your remaining balance is >-----> ") +
          chalk.white.bold(myBalance)
      );
      
    }   

      } // Incorrect PIN
// } else {
//   console.log("Incorrect pin number");
 }}
main();