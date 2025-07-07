import { fromZodError } from "zod-validation-error";
import { InterestPaidType, TermDepositFinalBalanceInput } from "../types/types";

const interestPaidTypeMap: Record<InterestPaidType, number> = {
  MONTHLY: 12,
  QUARTERLY: 4,
  ANNUALLY: 1,
  AT_MATURITY: 1,
};

/**
 * The function that can calculate the term deposit balance, all the input params accept both string and number,
 * and will convert the string automatically to number before calculation.
 * @param startAmount Initial principle balance
 * @param investmentTerm Number of time periods elapsed by month
 * @param interestRate Interest rate in percentage
 * @param interestPaidType Number of times interest applied per time period
 * @returns Term deposit Final balance number
 */
export const getTermDepositFinalBalance = (input: {
  startAmount: string | number;
  investmentTerm: string | number;
  interestRate: string | number;
  interestPaidType: string | number;
}): number => {
  const validateResult = TermDepositFinalBalanceInput.safeParse(input);

  if (!validateResult.success) {
    throw new Error(fromZodError(validateResult.error).toString());
  }
  const { investmentTerm, interestPaidType, interestRate, startAmount } =
    validateResult.data;

  const payType = interestPaidTypeMap[interestPaidType];

  let result;

  if (interestPaidType === "AT_MATURITY") {
    result = startAmount * (1 + ((interestRate / 100) * investmentTerm) / 12);
  } else {
    result =
      startAmount *
      Math.pow(
        1 + interestRate / 100 / payType,
        (investmentTerm * payType) / 12
      );
  }

  return Math.round(result);
};
