
export interface Income {
  id: string;
  amount: number;
  source: string;
  date: string;
  notes?: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  isEssential: boolean;
}

export interface BudgetState {
  incomes: Income[];
  expenses: Expense[];
  emergencyMode: boolean;
  dailyBudgetLimit: number;
  weeklyBudgetLimit: number;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  isEssential: boolean;
  icon?: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Housing', color: '#9AE7A0', isEssential: true, icon: 'home' },
  { id: '2', name: 'Utilities', color: '#A4C8F9', isEssential: true, icon: 'zap' },
  { id: '3', name: 'Groceries', color: '#68D16E', isEssential: true, icon: 'shopping-basket' },
  { id: '4', name: 'Transportation', color: '#5B9CF5', isEssential: true, icon: 'bus' },
  { id: '5', name: 'Healthcare', color: '#FFB5AC', isEssential: true, icon: 'activity' },
  { id: '6', name: 'Education', color: '#FFED8C', isEssential: true, icon: 'book' },
  { id: '7', name: 'Entertainment', color: '#FF8A7D', isEssential: false, icon: 'film' },
  { id: '8', name: 'Dining Out', color: '#FFF8C2', isEssential: false, icon: 'utensils' },
  { id: '9', name: 'Shopping', color: '#FFDAD6', isEssential: false, icon: 'shopping-bag' },
  { id: '10', name: 'Personal', color: '#D3E4FD', isEssential: false, icon: 'user' },
];

export const DEFAULT_INCOME_SOURCES = [
  'Salary',
  'Freelance',
  'Gift',
  'Scholarship',
  'Part-time Job',
  'Allowance',
  'Other'
];

export const DEFAULT_BUDGET_STATE: BudgetState = {
  incomes: [],
  expenses: [],
  emergencyMode: false,
  dailyBudgetLimit: 0,
  weeklyBudgetLimit: 0,
  categories: DEFAULT_CATEGORIES
};
