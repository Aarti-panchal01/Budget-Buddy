
import { Expense } from '@/utils/budgetTypes';
import { calculateDailyExpenses, calculateWeeklyExpenses, formatCurrency } from '@/utils/budgetCalculations';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface BudgetAlertProps {
  expenses: Expense[];
  dailyLimit: number;
  weeklyLimit: number;
  emergencyMode: boolean;
  onActivateEmergencyMode: () => void;
}

export function BudgetAlert({
  expenses,
  dailyLimit,
  weeklyLimit,
  emergencyMode,
  onActivateEmergencyMode,
}: BudgetAlertProps) {
  const today = new Date();
  const dailyExpenses = calculateDailyExpenses(expenses, today);
  const weeklyExpenses = calculateWeeklyExpenses(expenses, today);
  
  const isDailyLimitExceeded = dailyLimit > 0 && dailyExpenses > dailyLimit;
  const isWeeklyLimitExceeded = weeklyLimit > 0 && weeklyExpenses > weeklyLimit;
  const isNearDailyLimit = dailyLimit > 0 && dailyExpenses > dailyLimit * 0.8 && !isDailyLimitExceeded;
  const isNearWeeklyLimit = weeklyLimit > 0 && weeklyExpenses > weeklyLimit * 0.8 && !isWeeklyLimitExceeded;
  
  if (!dailyLimit && !weeklyLimit) {
    return null;
  }
  
  if (emergencyMode) {
    return (
      <Alert className="bg-budget-red-light border-budget-red mb-4">
        <AlertTriangle className="h-4 w-4 text-budget-red-dark" />
        <AlertTitle className="text-budget-red-dark">Emergency Mode Active</AlertTitle>
        <AlertDescription>
          You're in emergency mode. Only essential spending categories are available.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (isDailyLimitExceeded || isWeeklyLimitExceeded) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Budget Alert!</AlertTitle>
        <AlertDescription className="space-y-2">
          {isDailyLimitExceeded && (
            <p>
              You've exceeded your daily budget limit of {formatCurrency(dailyLimit)}.
              Current spending: {formatCurrency(dailyExpenses)}.
            </p>
          )}
          {isWeeklyLimitExceeded && (
            <p>
              You've exceeded your weekly budget limit of {formatCurrency(weeklyLimit)}.
              Current spending: {formatCurrency(weeklyExpenses)}.
            </p>
          )}
          <button
            onClick={onActivateEmergencyMode}
            className="text-white bg-destructive px-3 py-1 rounded text-sm hover:bg-destructive/90 mt-1"
          >
            Activate Emergency Mode
          </button>
        </AlertDescription>
      </Alert>
    );
  }
  
  if (isNearDailyLimit || isNearWeeklyLimit) {
    return (
      <Alert className="bg-budget-yellow-light border-budget-yellow mb-4">
        <AlertTriangle className="h-4 w-4 text-budget-yellow-dark" />
        <AlertTitle className="text-budget-yellow-dark">Budget Warning</AlertTitle>
        <AlertDescription>
          {isNearDailyLimit && (
            <p>
              You're approaching your daily budget limit of {formatCurrency(dailyLimit)}.
              Current spending: {formatCurrency(dailyExpenses)}.
            </p>
          )}
          {isNearWeeklyLimit && (
            <p>
              You're approaching your weekly budget limit of {formatCurrency(weeklyLimit)}.
              Current spending: {formatCurrency(weeklyExpenses)}.
            </p>
          )}
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
}
