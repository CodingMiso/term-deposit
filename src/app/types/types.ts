export type TermDepositFinalBalanceInput = {
  startAmount: number;
  investmentTerm: number;
  interestRate: number;
  interestPaidType: InterestPayType;
};

export type InterestPayType =
  | "MONTHLY"
  | "QUARTERLY"
  | "ANNUALLY"
  | "AT_MATURITY";
