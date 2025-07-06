"use client";

import { useState } from "react";
import { getTermDepositFinalBalance } from "../utils/getTermDepositFinalBalance";
import { InterestPayType, TermDepositFinalBalanceInput } from "../types/types";

// TODO: input validation
export const CalculationForm = () => {
  const [formData, setFormData] = useState<TermDepositFinalBalanceInput>({
    startAmount: 10000,
    interestRate: 1.1,
    investmentTerm: 36,
    interestPaidType: "ANNUALLY",
  });
  const shouldShowAnnuallyOption = Number(formData.investmentTerm) >= 12;

  // TODO: better type
  const finalBalance = getTermDepositFinalBalance({
    startAmount: Number(formData.startAmount),
    interestRate: Number(formData.interestRate),
    investmentTerm: Number(formData.investmentTerm),
    interestPaidType: formData.interestPaidType as InterestPayType,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <div>
      <div className="mt-4">
        <div className="mt-4">
          <label>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Starting with
            </span>

            <input
              type="number"
              min="1000"
              id="startAmount"
              name="startAmount"
              className="mt-0.5 w-full rounded border-gray-300 shadow-sm  dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              onChange={handleInputChange}
              value={formData.startAmount}
            />
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="interestRate">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Interest rate
            </span>

            <div className="relative">
              <input
                type="number"
                id="interestRate"
                name="interestRate"
                className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                onChange={handleInputChange}
                value={formData.interestRate}
              />

              <span className="absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-700 dark:text-gray-200">
                %
              </span>
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Investment term
            </span>
            <div className="relative">
              <input
                type="number"
                min="3"
                className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                id="investmentTerm"
                name="investmentTerm"
                onChange={(e) => {
                  const investmentTerm = e.target.value;
                  if (
                    Number(investmentTerm) < 12 &&
                    formData.interestPaidType === "ANNUALLY"
                  ) {
                    setFormData({
                      ...formData,
                      interestPaidType: "AT_MATURITY",
                      investmentTerm: Number(e.target.value),
                    });
                  } else {
                    handleInputChange(e);
                  }
                }}
                value={formData.investmentTerm}
              />

              <span className="absolute inset-y-0 right-0 grid w-20 place-content-center text-gray-700 dark:text-gray-200">
                months
              </span>
            </div>
          </label>
        </div>
        <div className="mt-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Interest paid
          </span>
          <fieldset className="space-y-3">
            <legend className="sr-only">Interest paid</legend>
            <div>
              <label
                htmlFor="interestPaidTypeMonthly"
                className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <p className="text-gray-700 dark:text-gray-200">Monthly</p>
                <input
                  type="radio"
                  name="interestPaidType"
                  value="MONTHLY"
                  id="interestPaidTypeMonthly"
                  className="sr-only"
                  checked={formData.interestPaidType === "MONTHLY"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="interestPaidTypeQuarterly"
                className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <p className="text-gray-700 dark:text-gray-200">Quarterly</p>
                <input
                  type="radio"
                  name="interestPaidType"
                  value="QUARTERLY"
                  id="interestPaidTypeQuarterly"
                  className="sr-only"
                  checked={formData.interestPaidType === "QUARTERLY"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {shouldShowAnnuallyOption ? (
              <div>
                <label
                  htmlFor="interestPaidTypeAnnually"
                  className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <p className="text-gray-700 dark:text-gray-200">Annually</p>
                  <input
                    type="radio"
                    name="interestPaidType"
                    value="ANNUALLY"
                    id="interestPaidTypeAnnually"
                    className="sr-only"
                    checked={formData.interestPaidType === "ANNUALLY"}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            ) : null}
            <div>
              <label
                htmlFor="interestPaidTypeAtMaturity"
                className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <p className="text-gray-700 dark:text-gray-200">At Maturity</p>
                <input
                  type="radio"
                  name="interestPaidType"
                  value="AT_MATURITY"
                  id="interestPaidTypeAtMaturity"
                  className="sr-only"
                  checked={formData.interestPaidType === "AT_MATURITY"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
          Final balance
          <strong className="text-indigo-600"> {finalBalance} </strong>
        </h2>
      </div>
    </div>
  );
};

export default CalculationForm;
