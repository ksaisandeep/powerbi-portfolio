import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { KPIMetrics } from '@/lib/filterUtils';
import KPICard from '../KPICard';

const COLORS = ['#06b6d4', '#0ea5e9', '#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a'];

export default function CustomerInsightsTab({ kpis, ageDistribution, paymentMethods, customerRatings, discountImpact }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Customers" value={kpis.totalCustomers.toLocaleString()} icon="👥" trend="+15.2%" trendColor="up" />
        <KPICard title="Avg Customer Rating" value={`${kpis.avgCustomerRating.toFixed(2)}/5`} icon="⭐" trend="+2.1%" trendColor="up" />
        <KPICard title="Repeat Purchase Rate" value="42.5%" icon="🔄" trend="+8.3%" trendColor="up" />
        <KPICard title="Customer Satisfaction" value={`${(kpis.avgCustomerRating * 20).toFixed(0)}%`} icon="😊" trend="+3.2%" trendColor="up" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle className="text-white">👨‍👩‍👧‍👦 Age Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="orders" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle className="text-white">💳 Payment Methods</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={paymentMethods} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name} ${percentage}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {paymentMethods.map((entry: any, index: number) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
