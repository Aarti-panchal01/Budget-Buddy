
import { useState, useEffect } from 'react';
import { BudgetState, Income, Expense, DEFAULT_BUDGET_STATE } from '@/utils/budgetTypes';
import { saveBudgetData, loadBudgetData } from '@/utils/budgetStorage';
import { DailyQuote } from '@/components/DailyQuote';
import { BudgetSummary } from '@/components/BudgetSummary';
import { IncomeForm } from '@/components/IncomeForm';
import { ExpenseForm } from '@/components/ExpenseForm';
import { EmergencyModeToggle } from '@/components/EmergencyModeToggle';
import { BudgetCharts } from '@/components/BudgetCharts';
import { TransactionList } from '@/components/TransactionList';
import { BudgetAlert } from '@/components/BudgetAlert';

export default function Index() {
  const [budgetData, setBudgetData] = useState<BudgetState>(DEFAULT_BUDGET_STATE);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const data = loadBudgetData();
    setBudgetData(data);
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveBudgetData(budgetData);
  }, [budgetData]);
  
  // Handler for adding a new income
  const handleAddIncome = (income: Income) => {
    setBudgetData((prev) => ({
      ...prev,
      incomes: [...prev.incomes, income],
    }));
  };
  
  // Handler for adding a new expense
  const handleAddExpense = (expense: Expense) => {
    setBudgetData((prev) => ({
      ...prev,
      expenses: [...prev.expenses, expense],
    }));
  };
  
  // Handler for toggling emergency mode
  const handleToggleEmergencyMode = (enabled: boolean) => {
    setBudgetData((prev) => ({
      ...prev,
      emergencyMode: enabled,
    }));
  };
  
  // Handler for updating budget limits
  const handleUpdateBudgetLimits = (daily: number, weekly: number) => {
    setBudgetData((prev) => ({
      ...prev,
      dailyBudgetLimit: daily,
      weeklyBudgetLimit: weekly,
    }));
  };
  
  // Handler for activating emergency mode (from alerts)
  const handleActivateEmergencyMode = () => {
    setBudgetData((prev) => ({
      ...prev,
      emergencyMode: true,
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Budget Buddy</h1>
          <p className="text-gray-600">Your friendly financial companion</p>
        </header>
        
        <div className="mb-6">
          <DailyQuote />
        </div>
        
        <BudgetAlert
          expenses={budgetData.expenses}
          dailyLimit={budgetData.dailyBudgetLimit}
          weeklyLimit={budgetData.weeklyBudgetLimit}
          emergencyMode={budgetData.emergencyMode}
          onActivateEmergencyMode={handleActivateEmergencyMode}
        />
        
        <div className="mb-8">
          <BudgetSummary
            incomes={budgetData.incomes}
            expenses={budgetData.expenses}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="space-y-8">
            <IncomeForm onAddIncome={handleAddIncome} />
            <EmergencyModeToggle
              emergencyMode={budgetData.emergencyMode}
              onToggle={handleToggleEmergencyMode}
              dailyLimit={budgetData.dailyBudgetLimit}
              weeklyLimit={budgetData.weeklyBudgetLimit}
              onUpdateLimits={handleUpdateBudgetLimits}
            />
          </div>
          
          <div>
            <ExpenseForm
              onAddExpense={handleAddExpense}
              categories={budgetData.categories}
              emergencyMode={budgetData.emergencyMode}
            />
          </div>
          
          <div>
            <TransactionList
              incomes={budgetData.incomes}
              expenses={budgetData.expenses}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <BudgetCharts
            expenses={budgetData.expenses}
            categories={budgetData.categories}
          />
        </div>
      </div>
    </div>
  );
}
