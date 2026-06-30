import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dashboardDataRaw from '@/lib/dashboardData.json';
import {
  filterData,
  calculateKPIs,
  getRevenueByCompany,
  getOrdersByCity,
  getProductCategoryDistribution,
  getOrdersOverTime,
  getRevenueByMonth,
  getRevenueByCategory,
  getAgeDistribution,
  getPaymentMethodDistribution,
  getCustomerRatingDistribution,
  getDeliveryPerformanceByCompany,
  getTopCitiesByRevenue,
  getDiscountImpact,
  getDeliverySpeedAnalysis,
  getOrderValueDistribution,
  FilterState,
  RawDataRecord,
  KPIMetrics,
} from '@/lib/filterUtils';
import OverviewTab from './tabs/OverviewTab';
import RevenueAnalysisTab from './tabs/RevenueAnalysisTab';
import CustomerInsightsTab from './tabs/CustomerInsightsTab';
import DeliveryAnalysisTab from './tabs/DeliveryAnalysisTab';
import OrderAnalysisTab from './tabs/OrderAnalysisTab';

const dashboardData = dashboardDataRaw as any as {
  raw_data: RawDataRecord[];
  filters: {
    companies: string[];
    cities: string[];
    categories: string[];
    date_range: { min: string; max: string };
  };
};

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: [dashboardData.filters.date_range.min, dashboardData.filters.date_range.max],
    companies: [],
    cities: [],
    categories: [],
  });

  const [activeTab, setActiveTab] = useState('overview');

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    const data = (dashboardData.raw_data as any[]).map((record: any) => ({
      ...record,
      Order_ID: parseInt(record.Order_ID) || 0,
      Customer_Age: parseFloat(record.Customer_Age) || 0,
      Order_Value: parseFloat(record.Order_Value) || 0,
      Delivery_Time_Min: parseFloat(record.Delivery_Time_Min) || 0,
      Distance_Km: parseFloat(record.Distance_Km) || 0,
      Items_Count: parseInt(record.Items_Count) || 0,
      Customer_Rating: parseFloat(record.Customer_Rating) || 0,
      Discount_Applied: parseInt(record.Discount_Applied) || 0,
      Delivery_Partner_Rating: parseFloat(record.Delivery_Partner_Rating) || 0,
    })) as RawDataRecord[];
    return filterData(data, filters);
  }, [filters]);

  // Calculate all metrics
  const kpis = useMemo(() => calculateKPIs(filteredData), [filteredData]);
  const revenueByCompany = useMemo(() => getRevenueByCompany(filteredData), [filteredData]);
  const ordersByCity = useMemo(() => getOrdersByCity(filteredData), [filteredData]);
  const productCategory = useMemo(() => getProductCategoryDistribution(filteredData), [filteredData]);
  const ordersOverTime = useMemo(() => getOrdersOverTime(filteredData), [filteredData]);
  const revenueByMonth = useMemo(() => getRevenueByMonth(filteredData), [filteredData]);
  const revenueByCategory = useMemo(() => getRevenueByCategory(filteredData), [filteredData]);
  const ageDistribution = useMemo(() => getAgeDistribution(filteredData), [filteredData]);
  const paymentMethods = useMemo(() => getPaymentMethodDistribution(filteredData), [filteredData]);
  const customerRatings = useMemo(() => getCustomerRatingDistribution(filteredData), [filteredData]);
  const deliveryPerformance = useMemo(() => getDeliveryPerformanceByCompany(filteredData), [filteredData]);
  const topCities = useMemo(() => getTopCitiesByRevenue(filteredData), [filteredData]);
  const discountImpact = useMemo(() => getDiscountImpact(filteredData), [filteredData]);
  const deliverySpeed = useMemo(() => getDeliverySpeedAnalysis(filteredData), [filteredData]);
  const orderValueDist = useMemo(() => getOrderValueDistribution(filteredData), [filteredData]);

  const handleResetFilters = () => {
    const minDate = dashboardData.filters.date_range.min.split(' ')[0];
    const maxDate = dashboardData.filters.date_range.max.split(' ')[0];
    setFilters({
      dateRange: [minDate, maxDate],
      companies: [],
      cities: [],
      categories: [],
    });
  };

  const toggleFilter = (type: 'companies' | 'cities' | 'categories', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Quick Commerce</h1>
                <p className="text-xs text-slate-400">Data Analysis Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Data refreshed on</p>
              <p className="text-xs text-slate-500">{new Date().toLocaleString()}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Date Range */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase">From Date</label>
            <Input
              type="date"
              value={filters.dateRange[0].split(' ')[0]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: [e.target.value, prev.dateRange[1]],
                }))
              }
              className="bg-slate-800 border-slate-700 text-white text-sm"
            />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase">To Date</label>
            <Input
              type="date"
              value={filters.dateRange[1].split(' ')[0]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: [prev.dateRange[0], e.target.value],
                }))
              }
              className="bg-slate-800 border-slate-700 text-white text-sm"
            />
            </div>

            {/* Company Filter */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase">Company</label>
              <Select
                value={filters.companies.length === 0 ? 'all' : filters.companies[0]}
                onValueChange={(value) => {
                  if (value === 'all') {
                    setFilters((prev) => ({ ...prev, companies: [] }));
                  } else {
                    toggleFilter('companies', value);
                  }
                }}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white text-sm">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white">All Companies</SelectItem>
                  {dashboardData.filters.companies.map((company) => (
                    <SelectItem key={company} value={company} className="text-white">
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase">City</label>
              <Select
                value={filters.cities.length === 0 ? 'all' : filters.cities[0]}
                onValueChange={(value) => {
                  if (value === 'all') {
                    setFilters((prev) => ({ ...prev, cities: [] }));
                  } else {
                    toggleFilter('cities', value);
                  }
                }}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white text-sm">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white">All Cities</SelectItem>
                  {dashboardData.filters.cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-white">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase">&nbsp;</label>
              <Button
                onClick={handleResetFilters}
                variant="outline"
                className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border border-slate-700 p-1 mb-8">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Revenue Analysis
            </TabsTrigger>
            <TabsTrigger
              value="customer"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Customer Insights
            </TabsTrigger>
            <TabsTrigger
              value="delivery"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Delivery Analysis
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Order Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab
              kpis={kpis}
              revenueByCompany={revenueByCompany}
              ordersByCity={ordersByCity}
              productCategory={productCategory}
              ordersOverTime={ordersOverTime}
            />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueAnalysisTab
              kpis={kpis}
              revenueByMonth={revenueByMonth}
              revenueByCategory={revenueByCategory}
              topCities={topCities}
            />
          </TabsContent>

          <TabsContent value="customer">
            <CustomerInsightsTab
              kpis={kpis}
              ageDistribution={ageDistribution}
              paymentMethods={paymentMethods}
              customerRatings={customerRatings}
              discountImpact={discountImpact}
            />
          </TabsContent>

          <TabsContent value="delivery">
            <DeliveryAnalysisTab
              kpis={kpis}
              deliveryPerformance={deliveryPerformance}
              deliverySpeed={deliverySpeed}
              ordersOverTime={ordersOverTime}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrderAnalysisTab
              kpis={kpis}
              ordersOverTime={ordersOverTime}
              revenueByCompany={revenueByCompany}
              orderValueDist={orderValueDist}
              discountImpact={discountImpact}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
