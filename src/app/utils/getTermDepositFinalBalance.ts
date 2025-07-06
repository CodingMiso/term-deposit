export type InterestPayType =
  | "MONTHLY"
  | "QUARTERLY"
  | "ANNUALLY"
  | "AT_MATURITY";

type Props = {
  startAmount: number;
  investmentTerm: number;
  interestRate: number;
  interestPaidType: InterestPayType;
};

const interestPaidTypeMap: Record<InterestPayType, number> = {
  MONTHLY: 12,
  QUARTERLY: 4,
  ANNUALLY: 1,
  AT_MATURITY: 1,
};

/**
 * @param startAmount Initial principle balance
 * @param investmentTerm Number of time periods elapsed by month
 * @param interestRate Interest rate in percentage
 * @param interestPaidType Number of times interest applied per time period
 * @returns Term deposit Final balance
 */
export const getTermDepositFinalBalance = ({
  startAmount,
  investmentTerm,
  interestRate,
  interestPaidType,
}: Props): number => {
  if (investmentTerm < 3) {
    return 0;
  }

  if (investmentTerm < 12 && interestPaidType === "ANNUALLY") {
    return 0;
  }

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
