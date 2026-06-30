import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { KPIMetrics } from '@/lib/filterUtils';
import KPICard from '../KPICard';

export default function DeliveryAnalysisTab({ kpis, deliveryPerformance, deliverySpeed, ordersOverTime }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Avg Delivery Time" value={`${kpis.avgDeliveryTime.toFixed(1)} Min`} icon="⏱️" trend="-5.3%" trendColor="down" />
        <KPICard title="Avg Partner Rating" value={`${kpis.avgDeliveryRating.toFixed(2)}/5`} icon="⭐" trend="+3.1%" trendColor="up" />
        <KPICard title="On-Time Delivery" value="87.3%" icon="✅" trend="+2.4%" trendColor="up" />
        <KPICard title="Delivery Success Rate" value="99.2%" icon="🎯" trend="+0.5%" trendColor="up" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle className="text-white">🏢 Delivery Time by Company</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deliveryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="avgDeliveryTime" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle className="text-white">📈 Delivery Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersOverTime.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
