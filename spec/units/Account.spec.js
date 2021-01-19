const Account = require("../../src/Account");
const Transaction = require("../../src/Transaction");

const mock_getDepositDetails = jest.fn();
jest.mock("../../src/Transaction", () => {
  return jest.fn().mockImplementation(() => {
    return { _getDepositDetails: mock_getDepositDetails };
  });
});

const mock_getWithdrawalDetails = jest.fn();
jest.mock("../../src/Transaction", () => {
  return jest.fn().mockImplementation(() => {
    return { _getWithdrawalDetails: mock_getWithdrawalDetails };
  });
});

beforeEach(() => {
  Transaction.mockClear();
  mock_getDepositDetails.mockClear();
});

describe("Account", () => {
  it("has a starting balance of zero", () => {
    let account = new Account();

    expect(account.balance).toEqual(0);
  });

  it("has an empty history at instantiation", () => {
    let account = new Account();

    expect(account.history).toEqual([]);
  });

  it("Making a deposit calls the Transaction class constructor", () => {
    let account = new Account();
    account.deposit(100);

    expect(Transaction).toHaveBeenCalledTimes(1);
  });

  it("Making a deposit calls a method on the Transaction class instance", () => {
    const account = new Account();
    account.deposit(100);

    expect(mock_getDepositDetails).toHaveBeenCalled();
  });

  it("Making a withdrawal calls the Transaction class constructor", () => {
    let account = new Account();
    account.deposit(100);
    account.withdraw(25);

    expect(Transaction).toHaveBeenCalledTimes(2);
  });

  it("Making a withdrawal calls a method on the Transaction class instance", () => {
    const account = new Account();
    account.deposit(100);
    account.withdraw(25);

    expect(mock_getWithdrawalDetails).toHaveBeenCalled();
  });
});
