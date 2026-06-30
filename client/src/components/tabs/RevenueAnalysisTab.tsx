import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { KPIMetrics } from '@/lib/filterUtils';
import KPICard from '../KPICard';

interface RevenueAnalysisTabProps {
  kpis: KPIMetrics;
  revenueByMonth: any[];
  revenueByCategory: any[];
  topCities: any[];
}

export default function RevenueAnalysisTab({
  kpis,
  revenueByMonth,
  revenueByCategory,
  topCities,
}: RevenueAnalysisTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Gross Revenue" value={`₹${(kpis.totalRevenue / 10000000).toFixed(2)}Cr`} icon="💵" trend="+18.6%" trendColor="up" />
        <KPICard title="Net Profit" value={`₹${(kpis.totalRevenue * 0.12 / 100000).toFixed(1)}L`} icon="📈" trend="+21.3%" trendColor="up" />
        <KPICard title="Average Order Value" value={`₹${kpis.avgOrderValue.toFixed(0)}`} icon="🛍️" trend="-4.8%" trendColor="down" />
        <KPICard title="Total Orders" value={kpis.totalOrders.toLocaleString()} icon="📦" trend="+12.5%" trendColor="up" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle className="text-white">📅 Revenue by Month</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="revenue" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle className="text-white">🏷️ Revenue by Category</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
