'use client';

import { useForm } from '@tanstack/react-form';
import { useState } from 'react';

type CalculationResult = {
  dailyDose: number;
  totalIU: number;
};

const TARGET = 50; // ng/mL optimal
const FACTOR = 40; // IU per ng/mL per kg
const DAYS = 30;

function calculateDailyDose(weightKg: number, currentLevel: number): CalculationResult {
  const deficit = TARGET - currentLevel;
  if (deficit <= 0) return { dailyDose: 0, totalIU: 0 };
  const totalIU = Math.round(deficit * weightKg * FACTOR);
  return { dailyDose: Math.round(totalIU / DAYS), totalIU };
}

export default function VitaminDCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const form = useForm({
    defaultValues: {
      weightKg: '' as unknown as number,
      currentLevel: '' as unknown as number,
      contactKey: '',
    },
    onSubmit: ({ value }) => {
      setResult(calculateDailyDose(Number(value.weightKg), Number(value.currentLevel)));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-full max-w-md flex flex-col gap-5"
    >
      <form.Field name="weightKg">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium">
              Body weight <span className="opacity-50">(kg)</span>
            </label>
            <input
              id={field.name}
              name={field.name}
              type="number"
              step="0.1"
              min="1"
              placeholder="e.g. 80"
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              onBlur={field.handleBlur}
              className="w-full rounded-xl border border-foreground/20 bg-background px-4 py-3 text-base placeholder:opacity-30 focus:outline-none focus:ring-2 focus:ring-foreground/30 transition"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="currentLevel">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium">
              Current 25(OH)D level <span className="opacity-50">(ng/mL)</span>
            </label>
            <input
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
              className="w-full rounded-xl border border-foreground/20 bg-background px-4 py-3 text-base placeholder:opacity-30 focus:outline-none focus:ring-2 focus:ring-foreground/30 transition"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="contactKey">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium">
              Contact Key <span className="opacity-50">(email)</span>
            </label>
            <input
              id={field.name}
              name={field.name}
              type="email"
              placeholder="e.g. your.email@example.com"
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded-xl border border-foreground/20 bg-background px-4 py-3 text-base placeholder:opacity-30 focus:outline-none focus:ring-2 focus:ring-foreground/30 transition"
            />
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        className="w-full rounded-xl bg-foreground text-background font-semibold py-3 px-6 hover:opacity-80 active:opacity-70 transition cursor-pointer"
      >
        Calculate my dose
      </button>

      {result !== null && (
        <div className="mt-2 rounded-2xl border border-foreground/10 bg-foreground/5 p-6 text-center flex flex-col gap-1">
          {result.dailyDose === 0 ? (
            <p className="font-medium">
              You&apos;re already at or above the 50 ng/mL target!
            </p>
          ) : (
            <>
              <p className="text-5xl font-bold tracking-tight">
                {result.dailyDose.toLocaleString()}
              </p>
              <p className="text-sm font-medium opacity-60">IU / day for 30 days</p>
              <p className="text-xs opacity-40 mt-2">
                Total loading dose: {result.totalIU.toLocaleString()} IU
              </p>
            </>
          )}
        </div>
      )}
    </form>
  );
}
