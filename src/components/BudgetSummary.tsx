
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Income, Expense } from '@/utils/budgetTypes';
import { calculateTotalIncome, calculateTotalExpenses, calculateBalance, formatCurrency } from '@/utils/budgetCalculations';
import { TrendingUp, TrendingDown, Banknote } from 'lucide-react';

interface BudgetSummaryProps {
  incomes: Income[];
  expenses: Expense[];
}

export function BudgetSummary({ incomes, expenses }: BudgetSummaryProps) {
  const totalIncome = calculateTotalIncome(incomes);
  const totalExpenses = calculateTotalExpenses(expenses);
  const balance = calculateBalance(incomes, expenses);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-budget-green-light border-budget-green">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-budget-green-dark" />
            Total Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-800">{formatCurrency(totalIncome)}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-budget-red-light border-budget-red">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-budget-red-dark" />
            Total Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</div>
        </CardContent>
      </Card>
      
      <Card className={balance >= 0 ? "bg-budget-blue-light border-budget-blue" : "bg-budget-red-light border-budget-red"}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Banknote className={`h-4 w-4 ${balance >= 0 ? "text-budget-blue-dark" : "text-budget-red-dark"}`} />
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance >= 0 ? "text-gray-800" : "text-budget-red-dark"}`}>
            {formatCurrency(balance)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
