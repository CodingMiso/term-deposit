import * as z from "zod";
export const InterestPaidType = z.enum([
  "MONTHLY",
  "QUARTERLY",
  "ANNUALLY",
  "AT_MATURITY",
] as const);

export type InterestPaidType = z.infer<typeof InterestPaidType>;

export const StartAmount = z.coerce
  .number()
  .int()
  .min(10)
  .max(1_500_000, "Cannot be greater than %1,500,000");

export const InvestmentTerm = z.coerce
  .number()
  .int()
  .min(3, "Cannot be lower than 3 months")
  .max(60, "Cannot be greater than 5 years");

export const InterestRate = z.coerce
  .number()
  .nonnegative()
  .max(15, "Cannot be greater than 15% p.a.");

export const TermDepositFinalBalanceInput = z
  .object({
    startAmount: StartAmount,
    investmentTerm: InvestmentTerm,
    interestRate: InterestRate,
    interestPaidType: InterestPaidType,
  })
  .refine(
    (obj) => !(obj.interestPaidType === "ANNUALLY" && obj.investmentTerm < 12),
    "Investment term should be equal or greater than 12 months if interest paid type is Annually",
  );

export type TermDepositFinalBalanceInput = z.infer<
  typeof TermDepositFinalBalanceInput
>;
