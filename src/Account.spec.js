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

  it("throws an error when insufficient funds to make withdrawal", () => {
    let account = new Account();

    expect(() => {
      account.withdraw(25);
    }).toThrow("Insufficient funds in account");
    expect(account.balance).toEqual(0);
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

  it("throws an error when user doesn't enter amount to withdraw", () => {
    let account = new Account();
    account.deposit(100);

    expect(() => {
      account.withdraw();
    }).toThrow("Amount to be withdrawn must be an integer");
    expect(account.balance).toEqual(100);
    expect(() => {
      account.withdraw("25");
    }).toThrow("Amount to be withdrawn must be an integer");
    expect(account.balance).toEqual(100);
    expect(() => {
      account.withdraw(null);
    }).toThrow("Amount to be withdrawn must be an integer");
    expect(account.balance).toEqual(100);
  });
});
