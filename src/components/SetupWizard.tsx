
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DollarSign, EuroSign, IndianRupee, CreditCard } from 'lucide-react';

interface SetupFormData {
  currency: string;
  userType: 'student' | 'working';
  initialBalance: number;
  monthlyIncome: number;
  categories: string[];
}

export function SetupWizard({ onComplete }: { onComplete: (data: SetupFormData) => void }) {
  const [step, setStep] = useState<number>(1);
  const { register, handleSubmit, watch } = useForm<SetupFormData>({
    defaultValues: {
      currency: '$',
      userType: 'working',
      categories: ['Food', 'Rent', 'Utilities', 'Transportation', 'Shopping']
    }
  });
  
  const currencyOptions = [
    { value: '$', label: 'USD', icon: DollarSign },
    { value: '€', label: 'EUR', icon: EuroSign },
    { value: '₹', label: 'INR', icon: IndianRupee }
  ];

  const userType = watch('userType');
  
  const onSubmit = (data: SetupFormData) => {
    onComplete(data);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-none shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg border-b">
          <CardTitle className="text-2xl font-semibold text-gray-800 tracking-tight">
            {step === 1 && "Welcome to Budget Buddy"}
            {step === 2 && "Tell us about yourself"}
            {step === 3 && "Set up your finances"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">Select your currency</Label>
                  <RadioGroup
                    defaultValue="$"
                    className="grid grid-cols-3 gap-4"
                    {...register('currency')}
                  >
                    {currencyOptions.map(({ value, label, icon: Icon }) => (
                      <div key={value}>
                        <RadioGroupItem
                          value={value}
                          id={value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={value}
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <Icon className="mb-2 h-6 w-6 text-emerald-600" />
                          <span className="text-sm font-medium">{label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Continue
                </Button>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">I am a</Label>
                  <RadioGroup
                    defaultValue="working"
                    className="grid grid-cols-2 gap-4"
                    {...register('userType')}
                  >
                    <div>
                      <RadioGroupItem
                        value="working"
                        id="working"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="working"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-emerald-600" />
                        <span className="text-sm font-medium">Working Professional</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="student"
                        id="student"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="student"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-emerald-600" />
                        <span className="text-sm font-medium">Student</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initialBalance">Current Balance</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{watch('currency')}</span>
                    <Input
                      id="initialBalance"
                      type="number"
                      placeholder="0.00"
                      className="pl-7"
                      {...register('initialBalance', { valueAsNumber: true })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="monthlyIncome">Monthly {userType === 'student' ? 'Allowance' : 'Income'}</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{watch('currency')}</span>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="0.00"
                      className="pl-7"
                      {...register('monthlyIncome', { valueAsNumber: true })}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Complete Setup
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
