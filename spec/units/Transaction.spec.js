const Transaction = require("../../src/Transaction");

describe("Transaction", () => {
  it("gets the deposit details", () => {
    jest
      .spyOn(global.Date, "now")
      .mockImplementationOnce(() => new Date("2021-01-12T23:13:31.060Z"));

    let transaction = new Transaction(25, 100);

    expect(transaction._getDepositDetails()).toEqual({
      date: "12/01/2021",
      credit: "25.00",
      debit: "",
      balance: "125.00",
    });
  });

  it("gets the withdrawal details", () => {
    jest
      .spyOn(global.Date, "now")
      .mockImplementationOnce(() => new Date("2021-01-12T23:13:31.060Z"));

    let transaction = new Transaction(25, 100);

    expect(transaction._getWithdrawalDetails()).toEqual({
      date: "12/01/2021",
      credit: "",
      debit: "25.00",
      balance: "75.00",
    });
  });
});
