import { describe } from "node:test";
import { getTermDepositFinalBalance } from "./getTermDepositFinalBalance";

describe("getTermDepositFinalBalance", () => {
  it("should throw an error if investmentTerm is lower than 3", () =>
    expect(() =>
      getTermDepositFinalBalance({
        startAmount: 10_000,
        investmentTerm: 2,
        interestRate: 1,
        interestPaidType: "MONTHLY",
      }),
    ).toThrow(
      'Validation error: Cannot be lower than 3 months at "investmentTerm"',
    ));

  it("should throw an error if investmentTerm is lower than 12 months and paid type ia ANNUALLY", () =>
    expect(() =>
      getTermDepositFinalBalance({
        startAmount: 10_000,
        investmentTerm: 10,
        interestRate: 1,
        interestPaidType: "ANNUALLY",
      }),
    ).toThrow(
      "Validation error: Investment term should be equal or greater than 12 months if interest paid type is Annually",
    ));
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
    ${2.5}       | ${"MONTHLY"}     | ${36}          | ${10778}
    ${2.5}       | ${"QUARTERLY"}   | ${36}          | ${10776}
    ${2.5}       | ${"ANNUALLY"}    | ${36}          | ${10769}
    ${2.5}       | ${"AT_MATURITY"} | ${36}          | ${10750}
    ${2.5}       | ${"MONTHLY"}     | ${20}          | ${10425}
    ${2.5}       | ${"QUARTERLY"}   | ${20}          | ${10424}
    ${2.5}       | ${"ANNUALLY"}    | ${20}          | ${10420}
    ${2.5}       | ${"AT_MATURITY"} | ${20}          | ${10417}
  `(
    "returns $expected given start amount 10,000, and interest paid type $interestPaidType and interest paid type is $interestRate, and investment term is $investmentTerm",
    ({ interestPaidType, interestRate, investmentTerm, expected }) => {
      expect(
        getTermDepositFinalBalance({
          startAmount: 10000,
          interestRate,
          interestPaidType,
          investmentTerm,
        }),
      ).toBe(expected);
    },
  );
});
