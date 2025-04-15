import { useState, useEffect } from 'react';
import { SetupWizard } from '@/components/SetupWizard';
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

interface SetupData {
  currency: string;
  userType: 'student' | 'working';
  initialBalance: number;
  monthlyIncome: number;
  categories: string[];
}

export default function Index() {
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const [budgetData, setBudgetData] = useState<BudgetState>(DEFAULT_BUDGET_STATE);
  
  useEffect(() => {
    const data = loadBudgetData();
    if (data.isSetupComplete) {
      setIsSetupComplete(true);
      setBudgetData(data);
    }
  }, []);
  
  const handleSetupComplete = (setupData: SetupData) => {
    const newBudgetState: BudgetState = {
      ...DEFAULT_BUDGET_STATE,
      isSetupComplete: true,
      currency: setupData.currency,
      userType: setupData.userType,
      initialBalance: setupData.initialBalance,
      monthlyIncome: setupData.monthlyIncome,
      incomes: [{
        id: Date.now().toString(),
        amount: setupData.monthlyIncome,
        source: setupData.userType === 'student' ? 'Allowance' : 'Salary',
        date: new Date().toISOString()
      }]
    };
    
    setBudgetData(newBudgetState);
    saveBudgetData(newBudgetState);
    setIsSetupComplete(true);
  };
  
  const handleAddIncome = (income: Income) => {
    setBudgetData((prev) => ({
      ...prev,
      incomes: [...prev.incomes, income],
    }));
  };
  
  const handleAddExpense = (expense: Expense) => {
    setBudgetData((prev) => ({
      ...prev,
      expenses: [...prev.expenses, expense],
    }));
  };
  
  const handleToggleEmergencyMode = (enabled: boolean) => {
    setBudgetData((prev) => ({
      ...prev,
      emergencyMode: enabled,
    }));
  };
  
  const handleUpdateBudgetLimits = (daily: number, weekly: number) => {
    setBudgetData((prev) => ({
      ...prev,
      dailyBudgetLimit: daily,
      weeklyBudgetLimit: weekly,
    }));
  };
  
  const handleActivateEmergencyMode = () => {
    setBudgetData((prev) => ({
      ...prev,
      emergencyMode: true,
    }));
  };
  
  if (!isSetupComplete) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Budget Buddy</h1>
          <p className="text-gray-600">Your personal finance companion</p>
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
            currency={budgetData.currency}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="space-y-8">
            <IncomeForm 
              onAddIncome={handleAddIncome}
              currency={budgetData.currency}
            />
            <EmergencyModeToggle
              emergencyMode={budgetData.emergencyMode}
              onToggle={handleToggleEmergencyMode}
              dailyLimit={budgetData.dailyBudgetLimit}
              weeklyLimit={budgetData.weeklyBudgetLimit}
              onUpdateLimits={handleUpdateBudgetLimits}
              currency={budgetData.currency}
            />
          </div>
          
          <div>
            <ExpenseForm
              onAddExpense={handleAddExpense}
              categories={budgetData.categories}
              emergencyMode={budgetData.emergencyMode}
              currency={budgetData.currency}
            />
          </div>
          
          <div>
            <TransactionList
              incomes={budgetData.incomes}
              expenses={budgetData.expenses}
              currency={budgetData.currency}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <BudgetCharts
            expenses={budgetData.expenses}
            categories={budgetData.categories}
            currency={budgetData.currency}
          />
        </div>
      </div>
    </div>
  );
}
