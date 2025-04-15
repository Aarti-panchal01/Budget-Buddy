
import { useState } from 'react';
import { Expense, Category } from '@/utils/budgetTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MinusCircleIcon } from 'lucide-react';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
  categories: Category[];
  emergencyMode: boolean;
  currency: string;
}

export function ExpenseForm({ onAddExpense, categories, emergencyMode, currency }: ExpenseFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  // Filter categories if in emergency mode
  const availableCategories = emergencyMode 
    ? categories.filter(cat => cat.isEssential)
    : categories;
  
  const selectedCategory = categories.find(cat => cat.id === category);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0 || !category) {
      return;
    }
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category: selectedCategory?.name || '',
      date: new Date().toISOString(),
      description,
      isEssential: selectedCategory?.isEssential || false,
    };
    
    onAddExpense(newExpense);
    
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
  };
  
  return (
    <Card className="border-budget-red shadow-sm">
      <CardHeader className="bg-budget-red-light rounded-t-lg">
        <CardTitle className="text-lg font-semibold text-gray-800">Add Expense</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currency}</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  className="pl-7"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {emergencyMode && categories.length !== availableCategories.length && (
                <p className="text-xs text-budget-red-dark mt-1">
                  Emergency mode is active. Only essential categories are available.
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-budget-red hover:bg-budget-red-dark">
            <MinusCircleIcon className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
