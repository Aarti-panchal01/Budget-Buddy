
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Expense, Category } from '@/utils/budgetTypes';
import { calculateExpensesByCategory, formatCurrency } from '@/utils/budgetCalculations';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface BudgetChartsProps {
  expenses: Expense[];
  categories: Category[];
}

export function BudgetCharts({ expenses, categories }: BudgetChartsProps) {
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);

  useEffect(() => {
    if (expenses.length === 0) return;

    const expensesByCategory = calculateExpensesByCategory(expenses);
    
    // Prepare data for pie chart
    const pieChartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: categories.find(cat => cat.name === category)?.color || '#gray',
    }));
    
    setPieData(pieChartData);
    
    // Prepare data for bar chart
    setBarData(pieChartData);
    
  }, [expenses, categories]);

  // If no expenses, show empty state
  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending Analysis</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>No expenses recorded yet</p>
            <p className="text-sm">Add some expenses to see your spending analytics</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-gray-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="pie" className="flex-1">Pie Chart</TabsTrigger>
            <TabsTrigger value="bar" className="flex-1">Bar Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pie" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="bar" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Amount">
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
