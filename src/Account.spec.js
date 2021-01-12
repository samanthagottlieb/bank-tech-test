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
});
