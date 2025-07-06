import { describe } from "node:test";
import { getTermDepositFinalBalance } from "./getTermDepositFinalBalance";

describe("getTermDepositFinalBalance", () => {
  it("should return 0 if investmentTerm is lower than 3", () =>
    expect(() =>
      getTermDepositFinalBalance({
        startAmount: 10_000,
        investmentTerm: 2,
        interestRate: 1,
        interestPaidType: "MONTHLY",
      })
    ).toBe(0));

  it("should return 0 if investmentTerm is lower than 12 months and annually paid type is selected", () =>
    expect(() =>
      getTermDepositFinalBalance({
        startAmount: 10_000,
        investmentTerm: 10,
        interestRate: 1,
        interestPaidType: "ANNUALLY",
      })
    ).toBe(0));
  /**
   * Start deposit amount (e.g. $10,000)
   * Interest rate (e.g. 1.10%)
   * Investment term (e.g. 3 years)
   * Interest paid (monthly, quarterly, annually, at maturity)
   * And produces as output:
   * Final balance (e.g. $10,330 on the above inputs, interest paid at maturity)
   */
  test.each`
    interestRate | interestPaidType | investmentTerm | expected
    ${1.1}       | ${"MONTHLY"}     | ${36}          | ${10335}
    ${1.1}       | ${"QUARTERLY"}   | ${36}          | ${10335}
    ${1.1}       | ${"ANNUALLY"}    | ${36}          | ${10334}
    ${1.1}       | ${"AT_MATURITY"} | ${36}          | ${10330}
  `(
    "returns $expected given start amount 10,000, and interest paid type $interestPaidType and interest paid type is $interestRate, and investment term is $investmentTerm",
    ({ interestPaidType, interestRate, investmentTerm, expected }) => {
      expect(
        getTermDepositFinalBalance({
          startAmount: 10000,
          interestRate,
          interestPaidType,
          investmentTerm,
        })
      ).toBe(expected);
    }
  );
});
