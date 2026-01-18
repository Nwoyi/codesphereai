import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { inquiryChartData } from "@/data/mockData";

interface InquiryChartProps {
  className?: string;
}

export function InquiryChart({ className }: InquiryChartProps) {
  return (
    <div className={cn("bg-card rounded-xl shadow-card border border-border/50", className)}>
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold text-foreground">Inquiry Trends</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Weekly inquiry and viewing performance</p>
      </div>
      
      <div className="p-5">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={inquiryChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="inquiryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="viewingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="inquiries"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#inquiryGradient)"
                name="Inquiries"
              />
              <Area
                type="monotone"
                dataKey="viewings"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                fill="url(#viewingGradient)"
                name="Viewings Booked"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
