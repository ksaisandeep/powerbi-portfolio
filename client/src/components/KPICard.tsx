import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendColor?: 'up' | 'down';
}

export default function KPICard({ title, value, icon, trend, trendColor }: KPICardProps) {
  // Format value to handle NaN and infinity
  const formattedValue = typeof value === 'number' && !isFinite(value) ? '—' : value;
  
  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-cyan-500/50 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
            <p className="text-2xl font-bold text-white mb-3">{formattedValue}</p>
            {trend && (
              <div className="flex items-center gap-1">
                {trendColor === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={trendColor === 'up' ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}>
                  {trend} vs Previous Period
                </span>
              </div>
            )}
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
