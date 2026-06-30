export interface RawDataRecord {
  Order_ID: number;
  Company: string;
  City: string;
  Customer_Age: number;
  Order_Value: number;
  Delivery_Time_Min: number;
  Distance_Km: number;
  Items_Count: number;
  Product_Category: string;
  Payment_Method: string;
  Customer_Rating: number;
  Discount_Applied: number;
  Delivery_Partner_Rating: number;
  Order_Date: string;
  Order_Month: string;
  Age_Group: string;
  Delivery_Speed: string;
  Customer_Rating_Category: string;
  Delivery_Rating_Category: string;
}

export interface FilterState {
  dateRange: [string, string];
  companies: string[];
  cities: string[];
  categories: string[];
}

export interface KPIMetrics {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  avgDeliveryTime: number;
  avgCustomerRating: number;
  avgDeliveryRating: number;
  totalCustomers: number;
  discountedOrdersPercentage: number;
}

export function filterData(data: RawDataRecord[], filters: FilterState): RawDataRecord[] {
  return data.filter((record) => {
    const recordDate = new Date(record.Order_Date);
    const startDate = new Date(filters.dateRange[0]);
    const endDate = new Date(filters.dateRange[1]);

    if (recordDate < startDate || recordDate > endDate) return false;
    if (filters.companies.length > 0 && !filters.companies.includes(record.Company)) return false;
    if (filters.cities.length > 0 && !filters.cities.includes(record.City)) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(record.Product_Category)) return false;

    return true;
  });
}

export function calculateKPIs(data: RawDataRecord[]): KPIMetrics {
  if (data.length === 0) {
    return {
      totalOrders: 0,
      totalRevenue: 0,
      avgOrderValue: 0,
      avgDeliveryTime: 0,
      avgCustomerRating: 0,
      avgDeliveryRating: 0,
      totalCustomers: 0,
      discountedOrdersPercentage: 0,
    };
  }

  const totalOrders = data.length;
  const totalRevenue = data.reduce((sum, r) => sum + r.Order_Value, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const avgDeliveryTime = data.reduce((sum, r) => sum + r.Delivery_Time_Min, 0) / totalOrders;
  const avgCustomerRating = data.reduce((sum, r) => sum + r.Customer_Rating, 0) / totalOrders;
  const avgDeliveryRating = data.reduce((sum, r) => sum + r.Delivery_Partner_Rating, 0) / totalOrders;
  const totalCustomers = new Set(data.map((r) => r.Order_ID)).size;
  const discountedOrders = data.filter((r) => r.Discount_Applied === 1).length;
  const discountedOrdersPercentage = (discountedOrders / totalOrders) * 100;

  return {
    totalOrders,
    totalRevenue,
    avgOrderValue,
    avgDeliveryTime,
    avgCustomerRating,
    avgDeliveryRating,
    totalCustomers,
    discountedOrdersPercentage,
  };
}

export function getRevenueByCompany(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, { revenue: number; orders: number }>();

  data.forEach((record) => {
    const key = record.Company;
    if (!grouped.has(key)) {
      grouped.set(key, { revenue: 0, orders: 0 });
    }
    const current = grouped.get(key)!;
    current.revenue += record.Order_Value;
    current.orders += 1;
  });

  return Array.from(grouped.entries())
    .map(([name, { revenue, orders }]) => ({
      name,
      revenue: Math.round(revenue),
      orders,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getOrdersByCity(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, number>();

  data.forEach((record) => {
    const key = record.City;
    grouped.set(key, (grouped.get(key) || 0) + 1);
  });

  return Array.from(grouped.entries())
    .map(([name, orders]) => ({ name, orders }))
    .sort((a, b) => b.orders - a.orders);
}

export function getProductCategoryDistribution(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, number>();

  data.forEach((record) => {
    const key = record.Product_Category;
    grouped.set(key, (grouped.get(key) || 0) + 1);
  });

  const total = data.length;
  return Array.from(grouped.entries())
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

export function getOrdersOverTime(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, number>();

  data.forEach((record) => {
    const date = record.Order_Date;
    grouped.set(date, (grouped.get(date) || 0) + 1);
  });

  return Array.from(grouped.entries())
    .map(([date, orders]) => ({ date, orders }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getRevenueByMonth(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, number>();

  data.forEach((record) => {
    const month = record.Order_Month;
    grouped.set(month, (grouped.get(month) || 0) + record.Order_Value);
  });

  return Array.from(grouped.entries())
    .map(([month, revenue]) => ({ month, revenue: Math.round(revenue) }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function getRevenueByCategory(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, number>();

  data.forEach((record) => {
    const key = record.Product_Category;
    grouped.set(key, (grouped.get(key) || 0) + record.Order_Value);
  });

  return Array.from(grouped.entries())
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value);
}

export function getAgeDistribution(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, number>();

  data.forEach((record) => {
    const key = record.Age_Group;
    grouped.set(key, (grouped.get(key) || 0) + 1);
  });

  return Array.from(grouped.entries()).map(([name, orders]) => ({ name, orders }));
}

export function getPaymentMethodDistribution(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, number>();

  data.forEach((record) => {
    const key = record.Payment_Method;
    grouped.set(key, (grouped.get(key) || 0) + 1);
  });

  const total = data.length;
  return Array.from(grouped.entries())
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

export function getCustomerRatingDistribution(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, number>();

  data.forEach((record) => {
    const key = record.Customer_Rating_Category;
    grouped.set(key, (grouped.get(key) || 0) + 1);
  });

  return Array.from(grouped.entries()).map(([name, value]) => ({ name, value }));
}

export function getDeliveryPerformanceByCompany(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, { times: number[]; ratings: number[] }>();

  data.forEach((record) => {
    const key = record.Company;
    if (!grouped.has(key)) {
      grouped.set(key, { times: [], ratings: [] });
    }
    const current = grouped.get(key)!;
    current.times.push(record.Delivery_Time_Min);
    current.ratings.push(record.Delivery_Partner_Rating);
  });

  return Array.from(grouped.entries())
    .map(([name, { times, ratings }]) => ({
      name,
      avgDeliveryTime: Math.round((times.reduce((a, b) => a + b, 0) / times.length) * 10) / 10,
      avgRating: Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 100) / 100,
    }))
    .sort((a, b) => a.avgDeliveryTime - b.avgDeliveryTime);
}

export function getTopCitiesByRevenue(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, { revenue: number; orders: number }>();

  data.forEach((record) => {
    const key = record.City;
    if (!grouped.has(key)) {
      grouped.set(key, { revenue: 0, orders: 0 });
    }
    const current = grouped.get(key)!;
    current.revenue += record.Order_Value;
    current.orders += 1;
  });

  const totalRevenue = Array.from(grouped.values()).reduce((sum, v) => sum + v.revenue, 0);

  return Array.from(grouped.entries())
    .map(([city, { revenue, orders }]) => ({
      city,
      revenue: Math.round(revenue),
      orders,
      aov: Math.round(revenue / orders),
      percentage: Math.round((revenue / totalRevenue) * 100),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
}

export function getDiscountImpact(data: RawDataRecord[]): any {
  const discounted = data.filter((r) => r.Discount_Applied === 1);
  const notDiscounted = data.filter((r) => r.Discount_Applied === 0);

  return {
    discounted: {
      percentage: Math.round((discounted.length / data.length) * 100),
      count: discounted.length,
      avgValue: discounted.length > 0 ? discounted.reduce((sum, r) => sum + r.Order_Value, 0) / discounted.length : 0,
      avgRating: discounted.length > 0 ? discounted.reduce((sum, r) => sum + r.Customer_Rating, 0) / discounted.length : 0,
    },
    notDiscounted: {
      percentage: Math.round((notDiscounted.length / data.length) * 100),
      count: notDiscounted.length,
      avgValue: notDiscounted.length > 0 ? notDiscounted.reduce((sum, r) => sum + r.Order_Value, 0) / notDiscounted.length : 0,
      avgRating: notDiscounted.length > 0 ? notDiscounted.reduce((sum, r) => sum + r.Customer_Rating, 0) / notDiscounted.length : 0,
    },
  };
}

export function getDeliverySpeedAnalysis(data: RawDataRecord[]): any[] {
  const grouped = new Map<string, { orders: number; ratings: number[] }>();

  data.forEach((record) => {
    const key = record.Delivery_Speed;
    if (!grouped.has(key)) {
      grouped.set(key, { orders: 0, ratings: [] });
    }
    const current = grouped.get(key)!;
    current.orders += 1;
    current.ratings.push(record.Delivery_Partner_Rating);
  });

  return Array.from(grouped.entries()).map(([name, { orders, ratings }]) => ({
    name,
    orders,
    avgRating: Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 100) / 100,
  }));
}

export function getOrderValueDistribution(data: RawDataRecord[]): any[] {
  const ranges = [
    { range: '₹0-200', min: 0, max: 200 },
    { range: '₹200-400', min: 200, max: 400 },
    { range: '₹400-600', min: 400, max: 600 },
    { range: '₹600-800', min: 600, max: 800 },
    { range: '₹800-1000', min: 800, max: 1000 },
    { range: '₹1000+', min: 1000, max: Infinity },
  ];

  return ranges.map((r) => ({
    range: r.range,
    count: data.filter((d) => d.Order_Value >= r.min && d.Order_Value < r.max).length,
  }));
}
