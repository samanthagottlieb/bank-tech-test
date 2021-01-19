class Transaction {
  constructor(amount, currentBalance, date = new Date(Date.now())) {
    this.amount = amount;
    this.currentBalance = currentBalance;
    this.date = date;
  }

  _getDepositDetails() {
    let newBalance = (this.currentBalance += this.amount);
    let depositDetails = {
      date: this.date.toLocaleDateString("en-GB"),
      credit: this.amount.toFixed(2),
      debit: "",
      balance: newBalance.toFixed(2),
    };

    return depositDetails;
  }

  _getWithdrawalDetails() {
    let newBalance = (this.currentBalance -= this.amount);
    let withdrawalDetails = {
      date: this.date.toLocaleDateString("en-GB"),
      credit: "",
      debit: this.amount.toFixed(2),
      balance: newBalance.toFixed(2),
    };

    return withdrawalDetails;
  }
}

module.exports = Transaction;
