import { cn } from "@/lib/utils";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { revenueChartData, topProductsData, mockOrders } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";

const hourlyData = [
  { hour: '6AM', orders: 2 },
  { hour: '8AM', orders: 5 },
  { hour: '10AM', orders: 12 },
  { hour: '12PM', orders: 18 },
  { hour: '2PM', orders: 8 },
  { hour: '4PM', orders: 15 },
  { hour: '6PM', orders: 22 },
  { hour: '8PM', orders: 10 },
  { hour: '10PM', orders: 4 },
];

const categoryData = [
  { name: 'Grains & Cereals', value: 35, color: 'hsl(var(--chart-1))' },
  { name: 'Oils & Fats', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Fresh Produce', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Proteins', value: 15, color: 'hsl(var(--chart-4))' },
  { name: 'Others', value: 5, color: 'hsl(var(--chart-5))' },
];

export function AnalyticsView() {
  const totalRevenue = mockOrders
    .filter(o => o.paymentStatus === 'confirmed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const avgOrderValue = totalRevenue / mockOrders.filter(o => o.paymentStatus === 'confirmed').length;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analytics"
        description="Sales insights and performance metrics"
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
          </Button>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground mt-1">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold text-foreground mt-1">{mockOrders.length}</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Avg Order Value</p>
          <p className="text-2xl font-bold text-foreground mt-1">{formatCurrency(avgOrderValue)}</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Conversion Rate</p>
          <p className="text-2xl font-bold text-foreground mt-1">68.5%</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend */}
        <div className="bg-card rounded-xl shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Revenue Trend</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Daily revenue over the past week</p>
          </div>
          <div className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(v) => `₦${(v/1000)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Hour */}
        <div className="bg-card rounded-xl shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Peak Hours</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Order distribution by time of day</p>
          </div>
          <div className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="orders" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-card rounded-xl shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Top Products</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Best selling items by units sold</p>
          </div>
          <div className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card rounded-xl shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Category Breakdown</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Revenue distribution by category</p>
          </div>
          <div className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
