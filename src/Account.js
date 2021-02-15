const Transaction = require("./Transaction");

class Account {
  constructor(balance = 0) {
    this.balance = balance;
    this.history = [];
  }

  deposit(amount, transactionClass = Transaction) {
    let transaction = new transactionClass(amount, this.balance);

    if (!Number.isInteger(amount)) {
      throw "Amount to be deposited must be an integer";
    } else {
      this._saveDeposit(transaction);
    }
  }

  withdraw(amount, transactionClass = Transaction) {
    let transaction = new transactionClass(amount, this.balance);

    if (amount > this.balance) {
      throw "Insufficient funds in account";
    } else if (!Number.isInteger(amount)) {
      throw "Amount to be withdrawn must be an integer";
    } else {
      this._saveWithdrawal(transaction);
    }
  }

  _saveDeposit(transaction) {
    this.balance += transaction.amount;
    this.history.push(transaction.getDepositDetails());
  }

  _saveWithdrawal(transaction) {
    this.balance -= transaction.amount;
    this.history.push(transaction.getWithdrawalDetails());
  }

  printStatement() {
    return "date || credit || debit || balance\n" + this._formatStatement();
  }

  _formatStatement() {
    let orderedHistory = this.history.reverse();
    let statement = [];

    orderedHistory.forEach((transaction) => {
      statement.push(
        `${transaction.date} || ${transaction.credit} || ${transaction.debit} || ${transaction.balance}`
      );
    });

    return statement.join("\n");
  }
}

module.exports = Account;
