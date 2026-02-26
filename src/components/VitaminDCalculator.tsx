'use client';

import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calculator,
  CheckCircle2,
  TrendingUp,
  Leaf,
  Weight,
  Target,
  Calendar,
  FlaskConical,
} from 'lucide-react';

type FormValues = {
  currentLevel: number;
  targetLevel: number;
  weightKg: number;
  days: number;
};

type CalculationResult = {
  dailyDose: number;
  totalIU: number;
  maintenanceDose: number;
  days: number;
  alreadyOptimal: boolean;
};

const DAYS_OPTIONS = [10, 20, 30, 60, 90] as const;

function calculateDose(values: FormValues): CalculationResult {
  const { currentLevel, targetLevel, weightKg, days } = values;
  const maintenanceDose = Math.round(weightKg * 50);
  if (currentLevel >= targetLevel) {
    return { dailyDose: 0, totalIU: 0, maintenanceDose, days, alreadyOptimal: true };
  }
  const totalIU = Math.round((targetLevel - currentLevel) * weightKg * 140);
  const dailyDose = Math.round(totalIU / days);
  return { dailyDose, totalIU, maintenanceDose, days, alreadyOptimal: false };
}

export default function VitaminDCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const form = useForm({
    defaultValues: {
      currentLevel: '' as unknown as number,
      targetLevel: 50,
      weightKg: '' as unknown as number,
      days: 30,
    },
    onSubmit: ({ value }) => {
      setResult(
        calculateDose({
          currentLevel: Number(value.currentLevel),
          targetLevel: Number(value.targetLevel),
          weightKg: Number(value.weightKg),
          days: Number(value.days),
        })
      );
    },
  });

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-5 w-5 text-primary" />
          Dose Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-5"
        >
          <form.Field name="currentLevel">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name} className="flex items-center gap-1.5">
                  <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />
                  Current 25(OH)D level{' '}
                  <span className="text-muted-foreground">(ng/mL)</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="1"
                  min="0"
                  max="150"
                  placeholder="e.g. 20"
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="targetLevel">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name} className="flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-muted-foreground" />
                  Target level{' '}
                  <span className="text-muted-foreground">(ng/mL)</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="1"
                  min="30"
                  max="100"
                  placeholder="e.g. 50"
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="weightKg">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name} className="flex items-center gap-1.5">
                  <Weight className="h-3.5 w-3.5 text-muted-foreground" />
                  Body weight <span className="text-muted-foreground">(kg)</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="0.1"
                  min="1"
                  placeholder="e.g. 70"
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="days">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  Duration (days)
                </Label>
                <Select
                  value={String(field.state.value)}
                  onValueChange={(val) => field.handleChange(Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS_OPTIONS.map((d) => (
                      <SelectItem key={d} value={String(d)}>
                        {d} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <Button type="submit" className="w-full gap-2">
            <Calculator className="h-4 w-4" />
            Calculate my dose
          </Button>
        </form>

        {result !== null && (
          <div className="mt-6 rounded-xl border bg-muted/40 p-6 text-center flex flex-col gap-2">
            {result.alreadyOptimal ? (
              <>
                <div className="flex justify-center mb-1">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-semibold text-green-600">
                  Your level is already at or above your target!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Maintenance dose:{' '}
                  <span className="font-bold text-foreground">
                    {result.maintenanceDose.toLocaleString()} IU/day
                  </span>
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-1">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <p className="text-5xl font-bold tracking-tight text-primary">
                  {result.dailyDose.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  IU / day for {result.days} days
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total loading dose: {result.totalIU.toLocaleString()} IU
                </p>
                <hr className="my-2 border-border" />
                <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <Leaf className="h-3.5 w-3.5 text-green-600" />
                  Maintenance dose after:{' '}
                  <span className="font-bold text-foreground">
                    {result.maintenanceDose.toLocaleString()} IU/day
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
