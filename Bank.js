// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }
    createAccount(name, initialDeposit) {
        const newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        return newAccount;
    }
}

class Account {
    constructor(name, balance = 0) {
        this.name = name;
        this.balance = balance;
        this.transactionHistory1 = [];
    }
    deposit(amount) {
        this.balance += amount;
        this.transactionHistory1.push({transactionType: 'Deposit', amount: amount});
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient Funds");
        } else {
            this.balance -= amount;
            this.transactionHistory1.push({transactionType: 'Withdrawal', amount: amount});
        }
    }
    transfer(amount, recipientAccount) {
        if (amount > this.balance) {
            console.log("Insufficient Funds");
        } else {
            this.balance -= amount;
            recipientAccount.balance += amount;
            this.transactionHistory1.push({transactionType: 'Transfer', amount: amount, to: recipientAccount.name });
            recipientAccount.transactionHistory1.push({transactionType: 'Received', amount: amount, from: this.name});
        }
    }
    get transactionHistory() {
        if (this.transactionHistory1.length === 0) {
            return `No Transaction History`;
        } else {
            return this.transactionHistory1;

        }
    }
    checkBalance() {
        return this.balance;
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
