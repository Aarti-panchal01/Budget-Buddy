
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface EmergencyModeToggleProps {
  emergencyMode: boolean;
  onToggle: (enabled: boolean) => void;
  dailyLimit: number;
  weeklyLimit: number;
  onUpdateLimits: (daily: number, weekly: number) => void;
}

export function EmergencyModeToggle({
  emergencyMode,
  onToggle,
  dailyLimit,
  weeklyLimit,
  onUpdateLimits,
}: EmergencyModeToggleProps) {
  const [newDailyLimit, setNewDailyLimit] = useState<string>(dailyLimit.toString());
  const [newWeeklyLimit, setNewWeeklyLimit] = useState<string>(weeklyLimit.toString());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const handleUpdateLimits = () => {
    onUpdateLimits(
      parseFloat(newDailyLimit) || 0,
      parseFloat(newWeeklyLimit) || 0
    );
    setIsEditing(false);
  };
  
  return (
    <Card className={emergencyMode ? "border-budget-red bg-budget-red-light/30" : "border-budget-yellow bg-budget-yellow-light/30"}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${emergencyMode ? "text-budget-red-dark" : "text-budget-yellow-dark"}`} />
            Emergency Mode
          </CardTitle>
          <Switch
            checked={emergencyMode}
            onCheckedChange={onToggle}
            className={emergencyMode ? "bg-budget-red-dark" : ""}
          />
        </div>
        <CardDescription>
          {emergencyMode
            ? "Emergency mode is active. Non-essential categories are hidden."
            : "Enable emergency mode to hide non-essential spending categories."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between">
                <Label className="text-sm text-gray-600">Daily Limit</Label>
                {!isEditing && (
                  <span className="text-sm font-medium">${dailyLimit.toFixed(2)}</span>
                )}
              </div>
              {isEditing && (
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    value={newDailyLimit}
                    onChange={(e) => setNewDailyLimit(e.target.value)}
                    className="pl-7"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label className="text-sm text-gray-600">Weekly Limit</Label>
                {!isEditing && (
                  <span className="text-sm font-medium">${weeklyLimit.toFixed(2)}</span>
                )}
              </div>
              {isEditing && (
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    value={newWeeklyLimit}
                    onChange={(e) => setNewWeeklyLimit(e.target.value)}
                    className="pl-7"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}
            </div>
          </div>
          
          {isEditing ? (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-budget-blue hover:bg-budget-blue-dark"
                onClick={handleUpdateLimits}
              >
                Save Limits
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setIsEditing(true)}
            >
              Edit Budget Limits
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
