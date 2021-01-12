const Account = require("./Account");

describe("Account", () => {
  let account = new Account();

  it("has a starting balance of zero", () => {
    expect(account.balance).toEqual(0);
  });
});
