const Account = require("./Account");

describe("Account", () => {
  it("has a starting balance of zero", () => {
    let account = new Account();
    expect(account.balance).toEqual(0);
  });

  it("allows the user to make a deposit", () => {
    let account = new Account();
    account.deposit(100);
    expect(account.balance).toEqual(100);
  });

  it("allows the user to make a withdrawal", () => {
    let account = new Account();
    account.deposit(100);
    account.withdraw(25);
    expect(account.balance).toEqual(75);
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

  it("saves a withdrawal in account history", () => {
    let account = new Account();
    jest
      .spyOn(global.Date, "now")
      .mockImplementation(() => new Date("2021-01-12T23:13:31.060Z"));

    account.deposit(100);
    account.withdraw(25);
    expect(account.history[1]).toEqual({
      date: "12/01/2021",
      credit: "",
      debit: "25.00",
      balance: "75.00",
    });
  });
});
