const Account = require("../../src/Account");

describe("Printing a bank statement", () => {
  it("prints a formatted bank statement", () => {
    let account = new Account();
    jest
      .spyOn(global.Date, "now")
      .mockImplementation(() => new Date("2021-01-12T23:13:31.060Z"));

    account.deposit(100);
    account.withdraw(25);

    expect(account.printStatement()).toEqual(
      "date || credit || debit || balance\n12/01/2021 ||  || 25.00 || 75.00\n12/01/2021 || 100.00 ||  || 100.00"
    );
  });
});
