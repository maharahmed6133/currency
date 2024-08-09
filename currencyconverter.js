import { number, confirm, select, input } from "@inquirer/prompts";
import chalk from "chalk";
async function operation() {
    const exchangeRates = {
        USD: { USD: 1.0, EUR: 0.85, GBP: 0.75, INR: 74.15, PKR: 160.0 },
        EUR: { USD: 1.18, EUR: 1.0, GBP: 0.88, INR: 87.21, PKR: 188.24 },
        GBP: { USD: 1.33, EUR: 1.14, GBP: 1.0, INR: 98.72, PKR: 213.69 },
        INR: { USD: 0.013, EUR: 0.011, GBP: 0.010, INR: 1.0, PKR: 2.16 },
        PKR: { USD: 0.0063, EUR: 0.0053, GBP: 0.0047, INR: 0.46, PKR: 1.0 }
    };
    while (true) {
        let name = await input({ message: chalk.blue("Please, enter your name:") });
        console.log(chalk.green(name));
        let consent = await confirm({ message: chalk.blue("Do you want to change your currency?") });
        if (consent) {
            let fromCurrency = await select({
                message: chalk.blue("Select the currency you want to convert from:"),
                choices: [
                    { name: "USD", value: "USD", description: "American Dollar" },
                    { name: "EUR", value: "EUR", description: "Euro" },
                    { name: "GBP", value: "GBP", description: "Pound Sterling" },
                    { name: "INR", value: "INR", description: "Indian Rupee" },
                    { name: "PKR", value: "PKR", description: "Pakistani Rupee" },
                ]
            });
            console.log(chalk.green(fromCurrency));
            let toCurrency = await select({
                message: chalk.blue("Select the currency you want to convert to:"),
                choices: [
                    { name: "USD", value: "USD", description: "American Dollar" },
                    { name: "EUR", value: "EUR", description: "Euro" },
                    { name: "GBP", value: "GBP", description: "Pound Sterling" },
                    { name: "INR", value: "INR", description: "Indian Rupee" },
                    { name: "PKR", value: "PKR", description: "Pakistani Rupee" },
                ]
            });
            console.log(chalk.green(toCurrency));
            let amount = await number({ message: chalk.blue("Enter the amount you want to convert:") });
            if (amount === undefined || isNaN(amount)) {
                console.log(chalk.red("Please enter a valid amount"));
            }
            else {
                let convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];
                console.log(chalk.green(`You have entered ${amount} ${fromCurrency} to convert to ${toCurrency}.`));
                console.log(chalk.green(`The converted amount is ${convertedAmount} ${toCurrency}.`));
            }
        }
        else {
            console.log(chalk.red("You chose not to change your currency."));
        }
        let restart = await confirm({ message: chalk.blue("Do you want to do another calculation?") });
        if (!restart) {
            console.log(chalk.green("Goodbye!"));
            break; // Exit the loop and end the program
        }
    }
}
operation();
