/**
 * Calculate the number of months needed to pay off a loan
 *
 * @param {number} loanAmount - The initial loan amount
 * @param {number} monthlyPayment - The monthly payment amount
 * @param {number} annualInterestRate - The annual interest rate (as a percentage)
 * @returns {number} - The number of months needed to pay off the loan
 */
export const calculateAmortizationTerm = (
  loanAmount,
  monthlyPayment,
  annualInterestRate,
) => {
  // Convert annual interest rate to monthly rate (decimal)
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  // If interest rate is 0, simple division
  if (monthlyInterestRate === 0) {
    return Math.ceil(loanAmount / monthlyPayment);
  }

  // Check if monthly payment is sufficient to cover at least the interest
  const minPayment = loanAmount * monthlyInterestRate;
  if (monthlyPayment <= minPayment) {
    return Infinity; // Payment too small to ever pay off the loan
  }

  // Calculate number of months using the amortization formula
  // n = -log(1 - (P * r) / M) / log(1 + r)
  // where:
  // n = number of months
  // P = principal (loan amount)
  // r = monthly interest rate (decimal)
  // M = monthly payment

  const term = Math.ceil(
    -Math.log(1 - (loanAmount * monthlyInterestRate) / monthlyPayment) /
      Math.log(1 + monthlyInterestRate),
  );

  return term;
};

/**
 * Generate an amortization schedule
 *
 * @param {number} loanAmount - The initial loan amount
 * @param {number} monthlyPayment - The monthly payment amount
 * @param {number} annualInterestRate - The annual interest rate (as a percentage)
 * @returns {Array} - Array of objects with payment details for each month
 */
export const generateAmortizationSchedule = (
  loanAmount,
  monthlyPayment,
  annualInterestRate,
) => {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  let balance = loanAmount;
  let month = 1;
  const schedule = [];

  // Continue until balance is paid off
  while (balance > 0) {
    // Calculate interest for this month
    const interestPayment = balance * monthlyInterestRate;

    // Calculate principal for this month
    let principalPayment = monthlyPayment - interestPayment;

    // Adjust for final payment if needed
    if (principalPayment > balance) {
      principalPayment = balance;
    }

    // Update remaining balance
    balance -= principalPayment;

    // Add to schedule
    schedule.push({
      month,
      payment: principalPayment + interestPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: balance,
    });

    month++;

    // Safety check to prevent infinite loops
    if (month > 1200) {
      // 100 years
      break;
    }
  }

  return schedule;
};
