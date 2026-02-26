import type { Metadata } from 'next';
import type { LucideIcon } from 'lucide-react';
import VitaminDCalculator from '@/components/VitaminDCalculator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  Bone,
  Zap,
  Heart,
  Sun,
  Lock,
  ChevronRight,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get your D — Vitamin D Dose Calculator',
  description:
    'Calculate your personal Vitamin D loading dose based on the Dr. von Helden formula — free, private, no data stored.',
  keywords: ['vitamin d', 'dose calculator', 'vitamin d deficiency', 'supplement', '25(OH)D'],
  openGraph: {
    title: 'Get your D — Vitamin D Dose Calculator',
    description:
      'Calculate your personal Vitamin D loading dose based on the Dr. von Helden formula — free, private, no data stored.',
    type: 'website',
  },
};

type HealthCard = {
  title: string;
  body: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
};

const HEALTH_CARDS: HealthCard[] = [
  {
    title: 'Immune System',
    body: 'Vitamin D activates T-cells and regulates inflammatory responses. Adequate levels (≥ 40 ng/mL) are associated with fewer infections and better immune resilience.',
    icon: Shield,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  {
    title: 'Bones & Muscles',
    body: 'Vitamin D is essential for calcium absorption. Deficiency leads to reduced bone density, muscle weakness, and increased risk of fractures and falls.',
    icon: Bone,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50 dark:bg-orange-950/40',
  },
  {
    title: 'Mood & Energy',
    body: 'Low 25(OH)D levels are linked to depressive symptoms and chronic fatigue. Many people report improved energy and mood after correcting their deficiency.',
    icon: Zap,
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-50 dark:bg-yellow-950/40',
  },
  {
    title: 'Heart & Metabolism',
    body: 'Research shows associations between vitamin D deficiency and high blood pressure, insulin resistance, and increased cardiovascular risk.',
    icon: Heart,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-50 dark:bg-rose-950/40',
  },
];

type LevelRange = {
  label: string;
  range: string;
  textColor: string;
  icon: LucideIcon;
  iconColor: string;
};

const LEVEL_RANGES: LevelRange[] = [
  { label: 'Deficient', range: '< 20 ng/mL', textColor: 'text-red-500', icon: AlertTriangle, iconColor: 'text-red-500' },
  { label: 'Suboptimal', range: '20–40 ng/mL', textColor: 'text-orange-500', icon: TrendingDown, iconColor: 'text-orange-500' },
  { label: 'Optimal', range: '40–60 ng/mL', textColor: 'text-green-600', icon: CheckCircle2, iconColor: 'text-green-600' },
  { label: 'High (safe)', range: '60–100 ng/mL', textColor: 'text-blue-500', icon: TrendingUp, iconColor: 'text-blue-500' },
  { label: 'Toxic', range: '> 150 ng/mL', textColor: 'text-red-700', icon: AlertCircle, iconColor: 'text-red-700' },
];

export default function Home() {
  return (
    <>
      {/* Hero + Calculator */}
      <section className="flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center">
        <Badge variant="secondary" className="mb-6 text-xs gap-1.5 px-3 py-1">
          <Lock className="h-3 w-3" />
          No data saved.
        </Badge>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-primary/10">
            <Sun className="h-9 w-9 text-primary" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight">Get your D</h1>
        </div>

        <p className="text-lg text-muted-foreground max-w-md mb-10">
          Find out your personalized Vitamin D loading dose — based on the scientific formula by
          Dr. von Helden. Enter your current level, target, and body weight to get started.
        </p>
        <VitaminDCalculator />
        <p className="mt-6 text-xs text-muted-foreground max-w-sm">
          Based on the Dr. von Helden formula: (target − current) × weight × 140 = total IU.
          Maintenance dose rule of thumb: 50 IU per kg body weight per day.
        </p>
      </section>

      {/* Health Benefits */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">Why Vitamin D Matters</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Vitamin D is far more than a bone vitamin. It acts as a hormone that influences dozens
            of systems in the body — many of which most people are deficient in.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {HEALTH_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${card.iconBg}`}>
                        <Icon className={`h-5 w-5 ${card.iconColor}`} />
                      </div>
                      <CardTitle className="text-base">{card.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Reference levels */}
          <div className="max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">25(OH)D Reference Levels</h3>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-right px-4 py-3 font-medium">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {LEVEL_RANGES.map((row, i) => {
                    const RowIcon = row.icon;
                    return (
                      <tr
                        key={row.label}
                        className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <RowIcon className={`h-4 w-4 ${row.iconColor}`} />
                            <span className={`font-medium ${row.textColor}`}>{row.label}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{row.range}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Values are approximate guidelines. Consult your doctor for medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <a
          href="/impressum"
          className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        >
          Legal Notice (Impressum)
          <ChevronRight className="h-3.5 w-3.5" />
        </a>
      </footer>
    </>
  );
}
