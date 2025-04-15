
import { Expense, Income } from './budgetTypes';

export const calculateTotalIncome = (incomes: Income[]): number => {
  return incomes.reduce((total, income) => total + income.amount, 0);
};

export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const calculateBalance = (incomes: Income[], expenses: Expense[]): number => {
  return calculateTotalIncome(incomes) - calculateTotalExpenses(expenses);
};

export const calculateExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);
};

export const calculateDailyExpenses = (expenses: Expense[], date: Date): number => {
  const dateString = date.toISOString().split('T')[0];
  return expenses
    .filter(expense => expense.date.startsWith(dateString))
    .reduce((total, expense) => total + expense.amount, 0);
};

export const calculateWeeklyExpenses = (expenses: Expense[], date: Date): number => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
    })
    .reduce((total, expense) => total + expense.amount, 0);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
