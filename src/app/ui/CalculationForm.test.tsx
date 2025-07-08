import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalculationForm from "./CalculationForm";

describe("CalculationForm", () => {
  it("update the finalBalance when update the input", async () => {
    render(<CalculationForm />);
    expect(screen.getByTestId("finalBalance")).toHaveTextContent("10334");
    const input = screen.getByText("Quarterly");

    await userEvent.click(input);

    expect(screen.getByTestId("finalBalance")).toHaveTextContent("10335");
  });

  it("remove the Annually term option when move the investment term to 10", async () => {
    render(<CalculationForm />);
    const input = screen.getByLabelText("Investment term (Months)");
    const annuallyInput = screen.getByText("Annually");

    await userEvent.clear(input);
    await userEvent.type(input, "10");
    await userEvent.click(screen.getByTestId("finalBalance"));

    expect(annuallyInput).not.toBeInTheDocument();
  });

  it("change the value to default value when providing invalid value", async () => {
    render(<CalculationForm />);

    const input = screen.getByLabelText("Investment term (Months)");

    expect(input).toHaveValue(36);

    await userEvent.clear(input);
    await userEvent.type(input, "2");
    await userEvent.click(screen.getByTestId("finalBalance"));

    expect(input).toHaveValue(36);
  });
});
