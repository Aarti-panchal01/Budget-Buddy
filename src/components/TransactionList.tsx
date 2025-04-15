
import { Expense, Income } from '@/utils/budgetTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface TransactionListProps {
  incomes: Income[];
  expenses: Expense[];
  currency: string;
}

export function TransactionList({ incomes, expenses, currency }: TransactionListProps) {
  // Sort transactions by date (most recent first)
  const sortedIncomes = [...incomes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toFixed(2)}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expenses">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="expenses" className="flex-1">Expenses</TabsTrigger>
            <TabsTrigger value="income" className="flex-1">Income</TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses">
            {sortedExpenses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No expenses recorded yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {sortedExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-budget-red-light p-2 rounded-full">
                        <ArrowDownIcon className="h-4 w-4 text-budget-red-dark" />
                      </div>
                      <div>
                        <div className="font-medium">{expense.description}</div>
                        <div className="text-sm text-gray-500">
                          <span>{formatDate(expense.date)}</span>
                          <span className="mx-2">•</span>
                          <span>{expense.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-budget-red-dark font-medium">
                      -{formatCurrency(expense.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="income">
            {sortedIncomes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No income recorded yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {sortedIncomes.map((income) => (
                  <div key={income.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-budget-green-light p-2 rounded-full">
                        <ArrowUpIcon className="h-4 w-4 text-budget-green-dark" />
                      </div>
                      <div>
                        <div className="font-medium">{income.source}</div>
                        <div className="text-sm text-gray-500">
                          <span>{formatDate(income.date)}</span>
                          {income.notes && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{income.notes}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-budget-green-dark font-medium">
                      {formatCurrency(income.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
