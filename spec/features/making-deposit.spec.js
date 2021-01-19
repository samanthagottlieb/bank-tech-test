const Account = require("../../src/Account");

describe("Making a deposit", () => {
  it("allows the user to make a deposit", () => {
    let account = new Account();
    account.deposit(100);

    expect(account.balance).toEqual(100);
  });

  it("saves a deposit in account history", () => {
    let account = new Account();
    jest
      .spyOn(global.Date, "now")
      .mockImplementationOnce(() => new Date("2021-01-12T23:13:31.060Z"));

    account.deposit(100);

    expect(account.history).toEqual([
      {
        date: "12/01/2021",
        credit: "100.00",
        debit: "",
        balance: "100.00",
      },
    ]);
  });

  it("throws an error when user doesn't enter amount to deposit", () => {
    let account = new Account();

    expect(() => {
      account.deposit();
    }).toThrow("Amount to be deposited must be an integer");
    expect(account.balance).toEqual(0);
    expect(() => {
      account.deposit("100");
    }).toThrow("Amount to be deposited must be an integer");
    expect(account.balance).toEqual(0);
    expect(() => {
      account.deposit(null);
    }).toThrow("Amount to be deposited must be an integer");
    expect(account.balance).toEqual(0);
  });
});
