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
import { inquiryChartData, topPropertiesData, mockViewings, peakHoursData, sourceBreakdownData, responseTimeData } from "@/data/mockData";
import { formatPercentage } from "@/lib/formatters";

export function AnalyticsView() {
  const totalInquiries = inquiryChartData.reduce((sum, d) => sum + d.inquiries, 0);
  const totalViewings = inquiryChartData.reduce((sum, d) => sum + d.viewings, 0);
  const conversionRate = (totalViewings / totalInquiries) * 100;

  // Calculate after-hours inquiries (approximation from peak hours)
  const afterHoursInquiries = peakHoursData
    .filter(h => ['10PM', '12AM', '2AM'].includes(h.hour))
    .reduce((sum, h) => sum + h.inquiries, 0);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analytics"
        description="Property inquiry insights and performance metrics"
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
          <p className="text-sm text-muted-foreground">Total Inquiries</p>
          <p className="text-2xl font-bold text-foreground mt-1">{totalInquiries}</p>
          <p className="text-xs text-muted-foreground mt-1">This week</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Viewings Booked</p>
          <p className="text-2xl font-bold text-foreground mt-1">{mockViewings.length}</p>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Conversion Rate</p>
          <p className="text-2xl font-bold text-success mt-1">{formatPercentage(conversionRate)}</p>
          <p className="text-xs text-muted-foreground mt-1">Inquiry → Viewing</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">After-Hours Inquiries</p>
          <p className="text-2xl font-bold text-foreground mt-1">{afterHoursInquiries}</p>
          <p className="text-xs text-muted-foreground mt-1">11PM - 6AM (Bot handled)</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Inquiry Trend */}
        <div className="bg-card rounded-xl shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Inquiry Trends</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Daily inquiries over the past week</p>
          </div>
          <div className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inquiryChartData}>
                <defs>
                  <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="inquiries" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#colorInquiries)" name="Inquiries" />
                <Area type="monotone" dataKey="viewings" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="none" name="Viewings Booked" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-card rounded-xl shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Peak Inquiry Hours</h3>
            <p className="text-sm text-muted-foreground mt-0.5">When guests message most</p>
          </div>
          <div className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="inquiries" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Inquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Properties */}
        <div className="bg-card rounded-xl shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Top Properties by Interest</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Most inquired properties</p>
          </div>
          <div className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPropertiesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis type="category" dataKey="propertyName" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="inquiries" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} name="Inquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="bg-card rounded-xl shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold text-foreground">Lead Sources</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Where guests find your properties</p>
          </div>
          <div className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sourceBreakdownData.map((entry, index) => (
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

      {/* Response Time Distribution */}
      <div className="bg-card rounded-xl shadow-card border border-border/50">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-foreground">Response Time Distribution</h3>
          <p className="text-sm text-muted-foreground mt-0.5">How fast the bot responds to inquiries</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-4 gap-4">
            {responseTimeData.map((item, index) => (
              <div key={item.range} className="text-center">
                <div className="relative h-32 bg-muted rounded-lg overflow-hidden mb-2">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-primary transition-all duration-500"
                    style={{ height: `${item.percentage}%` }}
                  />
                </div>
                <p className="font-semibold text-foreground">{item.range}</p>
                <p className="text-sm text-muted-foreground">{item.count} ({item.percentage}%)</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
