import { TermDepositFinalBalanceInput } from "./types";

describe("StartAmount", () => {
  it.each`
    startAmount  | interestRate | interestPaidType | investmentTerm
    ${10_000}    | ${1.1}       | ${"MONTHLY"}     | ${3}
    ${10}        | ${1.123}     | ${"QUARTERLY"}   | ${60}
    ${1_500_000} | ${15}        | ${"ANNUALLY"}    | ${15}
    ${10_000}    | ${0}         | ${"AT_MATURITY"} | ${3}
  `(
    "pass the validation given startAmount:$startAmount, interestRate:$interestRate, interestPaidType:$interestPaidType and investmentTerm:$investmentTerm",
    (input) => {
      const result = TermDepositFinalBalanceInput.safeParse(input);
      expect(result.success).toBeTruthy();
    },
  );

  it.each`
    startAmount | interestRate | interestPaidType | investmentTerm
    ${-1}       | ${1.1}       | ${"MONTHLY"}     | ${3}
    ${10_000}   | ${-1}        | ${"MONTHLY"}     | ${3}
    ${10_000}   | ${1.1}       | ${"invalid"}     | ${3}
    ${10_000}   | ${1.1}       | ${"MONTHLY"}     | ${-1}
    ${10_000}   | ${1.1}       | ${"MONTHLY"}     | ${0.15}
    ${10_000}   | ${30}        | ${"MONTHLY"}     | ${3}
    ${10_000}   | ${1.1}       | ${"MONTHLY"}     | ${61}
    ${10_000}   | ${1.1}       | ${"MONTHLY"}     | ${2}
  `(
    "fails the validation given startAmount:$startAmount, interestRate:$interestRate, interestPaidType:$interestPaidType and investmentTerm:$investmentTerm",
    (input) => {
      const result = TermDepositFinalBalanceInput.safeParse(input);
      expect(result.success).toBeFalsy();
    },
  );
});
