import React, { useState } from "react";
import "../styles/AmortizationCalculator.css";
import { calculateAmortizationTerm } from "../utils/amortizationCalculator";

const AmortizationCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [termOutput, setTermOutput] = useState("");
  const [errors, setErrors] = useState({
    loanAmount: false,
    monthlyPayment: false,
    interestRate: false,
  });

  const validateInput = (name, value) => {
    if (value === "") return false;
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "loanAmount":
        setLoanAmount(value);
        setErrors((prev) => ({
          ...prev,
          loanAmount: !validateInput(name, value),
        }));
        break;
      case "monthlyPayment":
        setMonthlyPayment(value);
        setErrors((prev) => ({
          ...prev,
          monthlyPayment: !validateInput(name, value),
        }));
        break;
      case "interestRate":
        setInterestRate(value);
        setErrors((prev) => ({
          ...prev,
          interestRate: !validateInput(name, value),
        }));
        break;
      default:
        break;
    }
  };

  const handleCalculate = () => {
    // Validate all inputs
    const newErrors = {
      loanAmount: !validateInput("loanAmount", loanAmount),
      monthlyPayment: !validateInput("monthlyPayment", monthlyPayment),
      interestRate: !validateInput("interestRate", interestRate),
    };

    setErrors(newErrors);

    // If no errors, calculate term
    if (
      !newErrors.loanAmount &&
      !newErrors.monthlyPayment &&
      !newErrors.interestRate
    ) {
      const term = calculateAmortizationTerm(
        parseFloat(loanAmount),
        parseFloat(monthlyPayment),
        parseFloat(interestRate),
      );

      setTermOutput(
        `${term} months (${Math.floor(term / 12)} years and ${term % 12} months)`,
      );
    }
  };

  const handleCancel = () => {
    setLoanAmount("");
    setMonthlyPayment("");
    setInterestRate("");
    setTermOutput("");
    setErrors({
      loanAmount: false,
      monthlyPayment: false,
      interestRate: false,
    });
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <div className="calculator-title">Amortization</div>
        <div className="calculator-divider"></div>
      </div>

      <div className="calculator-form">
        <div className="form-group">
          <label className="form-label">Loan Amount</label>
          <input
            type="text"
            name="loanAmount"
            value={loanAmount}
            onChange={handleInputChange}
            className={`form-input ${errors.loanAmount ? "input-error" : ""}`}
            placeholder="Enter loan amount"
          />
          {errors.loanAmount && (
            <div className="error-message">Enter a numeric value</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Monthly Payment</label>
          <input
            type="text"
            name="monthlyPayment"
            value={monthlyPayment}
            onChange={handleInputChange}
            className={`form-input ${errors.monthlyPayment ? "input-error" : ""}`}
            placeholder="Enter monthly payment"
          />
          {errors.monthlyPayment && (
            <div className="error-message">Enter a numeric value</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Interest Rate per Year</label>
          <input
            type="text"
            name="interestRate"
            value={interestRate}
            onChange={handleInputChange}
            className={`form-input ${errors.interestRate ? "input-error" : ""}`}
            placeholder="Enter your interest rate"
          />
          {errors.interestRate && (
            <div className="error-message">Enter a numeric value</div>
          )}
        </div>

        <div className="form-label">Term output:</div>
        {termOutput && <div className="term-result">{termOutput}</div>}
      </div>

      <div className="calculator-actions">
        <div className="cancel-button" onClick={handleCancel}>
          Cancel
        </div>
        <div className="calculate-button" onClick={handleCalculate}>
          Calculate
        </div>
      </div>
    </div>
  );
};

export default AmortizationCalculator;
