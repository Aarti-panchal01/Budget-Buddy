
import { useState } from 'react';
import { Income } from '@/utils/budgetTypes';
import { DEFAULT_INCOME_SOURCES } from '@/utils/budgetTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircleIcon } from 'lucide-react';

interface IncomeFormProps {
  onAddIncome: (income: Income) => void;
}

export function IncomeForm({ onAddIncome }: IncomeFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [source, setSource] = useState<string>('Salary');
  const [notes, setNotes] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }
    
    const newIncome: Income = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      source,
      date: new Date().toISOString(),
      notes: notes || undefined,
    };
    
    onAddIncome(newIncome);
    
    // Reset form
    setAmount('');
    setSource('Salary');
    setNotes('');
  };
  
  return (
    <Card className="border-budget-green shadow-sm">
      <CardHeader className="bg-budget-green-light rounded-t-lg">
        <CardTitle className="text-lg font-semibold text-gray-800">Add Income</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
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
              <Label htmlFor="source">Source</Label>
              <Select value={source} onValueChange={setSource} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_INCOME_SOURCES.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              placeholder="Add any notes about this income"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full bg-budget-green hover:bg-budget-green-dark">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Add Income
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
