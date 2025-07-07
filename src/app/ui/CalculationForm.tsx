"use client";

import { useEffect, useState } from "react";
import { getTermDepositFinalBalance } from "../utils/getTermDepositFinalBalance";
import {
  InterestPaidType,
  InterestRate,
  InvestmentTerm,
  StartAmount,
} from "../types/types";
import FormInput from "./FormInput";

export const CalculationForm = () => {
  const [error, setError] = useState<string>();
  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [formData, setFormData] = useState({
    startAmount: "10000",
    interestRate: "1.1",
    investmentTerm: "36",
    interestPaidType: "ANNUALLY",
  });

  useEffect(() => {
    try {
      setFinalBalance(getTermDepositFinalBalance(formData));

      if (error) {
        setError(undefined);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [formData, error]);

  const handleInputChange = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInvestmentTermInputChange = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const investmentTerm = value;
    if (
      Number(investmentTerm) < 12 &&
      formData.interestPaidType === "ANNUALLY"
    ) {
      setFormData({
        ...formData,
        interestPaidType: "AT_MATURITY",
        investmentTerm: value,
      });
    } else {
      handleInputChange(value, e);
    }
  };

  const shouldShowAnnuallyOption = Number(formData.investmentTerm) >= 12;

  return (
    <div>
      <div className="mt-4 max-w-70">
        <div className="mt-4">
          <label>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Starting with
            </span>

            <FormInput
              type="number"
              min="1000"
              id="startAmount"
              name="startAmount"
              className="mt-0.5 w-full rounded border-gray-300 shadow-sm  dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              onChange={handleInputChange}
              validateOnBlur
              schema={StartAmount}
              value={formData.startAmount}
            />
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="interestRate">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Interest rate (% p.a.)
            </span>

            <div className="relative">
              <FormInput
                type="number"
                min="0"
                max="15"
                step="0.1"
                id="interestRate"
                name="interestRate"
                className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                schema={InterestRate}
                onChange={handleInputChange}
                validateOnBlur
                value={formData.interestRate}
              />
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Investment term (Months)
            </span>
            <div className="relative">
              <FormInput
                type="number"
                min="3"
                max="60"
                className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                id="investmentTerm"
                name="investmentTerm"
                schema={InvestmentTerm}
                onChange={handleInvestmentTermInputChange}
                validateOnBlur
                value={formData.investmentTerm}
              />
            </div>
          </label>

          <div className="relative mb-6">
            <FormInput
              type="range"
              name="investmentTerm"
              value={formData.investmentTerm}
              schema={InvestmentTerm}
              onChange={handleInvestmentTermInputChange}
              min="3"
              max="60"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
              Min (3 months)
            </span>

            <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
              Max (5 years)
            </span>
          </div>
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
                <FormInput
                  type="radio"
                  name="interestPaidType"
                  value="MONTHLY"
                  id="interestPaidTypeMonthly"
                  className="sr-only"
                  checked={formData.interestPaidType === "MONTHLY"}
                  schema={InterestPaidType}
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
                <FormInput
                  type="radio"
                  name="interestPaidType"
                  value="QUARTERLY"
                  id="interestPaidTypeQuarterly"
                  className="sr-only"
                  schema={InterestPaidType}
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
                  <FormInput
                    type="radio"
                    name="interestPaidType"
                    value="ANNUALLY"
                    id="interestPaidTypeAnnually"
                    className="sr-only"
                    schema={InterestPaidType}
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
                <FormInput
                  type="radio"
                  name="interestPaidType"
                  value="AT_MATURITY"
                  id="interestPaidTypeAtMaturity"
                  className="sr-only"
                  schema={InterestPaidType}
                  checked={formData.interestPaidType === "AT_MATURITY"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      {error ? (
        <div className="mt-4 max-w-70">{error}</div>
      ) : (
        <div className="mt-8 text-center">
          <h2 className="font-bold text-gray-900 text-2xl dark:text-white">
            Final balance
          </h2>
          <strong className="text-indigo-600 text-2xl">{finalBalance}</strong>
        </div>
      )}
    </div>
  );
};

export default CalculationForm;
