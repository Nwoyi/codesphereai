import { MetricCard } from "./MetricCard";
import { RecentActivity } from "./RecentActivity";
import { InquiryChart } from "./InquiryChart";
import { TopProperties } from "./TopProperties";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { 
  MessageSquare, 
  Calendar, 
  Clock, 
  Zap,
  TrendingUp,
  Moon
} from "lucide-react";
import { mockMetrics, mockConversations, mockViewings } from "@/data/mockData";
import { formatPercentage, formatResponseTime } from "@/lib/formatters";

export function DashboardView() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your property inquiry overview."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-primary hover:opacity-90">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </>
        }
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Inquiries Today"
          value={mockMetrics.inquiriesToday}
          trend={mockMetrics.inquiriesTrend}
          trendLabel="vs yesterday"
          icon={MessageSquare}
          iconColor="text-info"
        />
        <MetricCard
          title="Active Conversations"
          value={mockMetrics.activeConversations}
          icon={MessageSquare}
          iconColor="text-warning"
        />
        <MetricCard
          title="Viewings Scheduled"
          value={mockMetrics.viewingsScheduled}
          trend={mockMetrics.viewingsTrend}
          trendLabel="this week"
          icon={Calendar}
          iconColor="text-success"
        />
        <MetricCard
          title="Avg Response Time"
          value={formatResponseTime(mockMetrics.avgResponseTime)}
          trend={mockMetrics.responseTimeTrend}
          trendLabel="faster"
          icon={Zap}
          iconColor="text-primary"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Response Rate"
          value={formatPercentage(mockMetrics.responseRate)}
          icon={Clock}
          iconColor="text-chart-1"
        />
        <MetricCard
          title="Conversion Rate"
          value={formatPercentage(mockMetrics.conversionRate)}
          icon={TrendingUp}
          iconColor="text-chart-2"
        />
        <MetricCard
          title="After-Hours Inquiries"
          value={mockMetrics.afterHoursInquiries}
          icon={Moon}
          iconColor="text-chart-3"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InquiryChart className="lg:col-span-2" />
        <TopProperties />
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <RecentActivity
          conversations={mockConversations}
          viewings={mockViewings}
        />
      </div>
    </div>
  );
}
