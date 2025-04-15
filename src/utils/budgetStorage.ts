
import { BudgetState, DEFAULT_BUDGET_STATE } from './budgetTypes';

const STORAGE_KEY = 'budget-buddy-data';

export const saveBudgetData = (data: BudgetState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadBudgetData = (): BudgetState => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  
  if (!storedData) {
    return DEFAULT_BUDGET_STATE;
  }
  
  try {
    return JSON.parse(storedData) as BudgetState;
  } catch (error) {
    console.error('Error parsing budget data:', error);
    return DEFAULT_BUDGET_STATE;
  }
};

export const clearBudgetData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
