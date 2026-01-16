import { MetricCard } from "./MetricCard";
import { RecentActivity } from "./RecentActivity";
import { RevenueChart } from "./RevenueChart";
import { TopProducts } from "./TopProducts";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { 
  MessageSquare, 
  ShoppingCart, 
  CheckCircle2, 
  DollarSign,
  TrendingUp,
  Users
} from "lucide-react";
import { mockMetrics, mockConversations, mockOrders } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";

export function DashboardView() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening today."
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
          title="Conversations Today"
          value={mockMetrics.conversationsToday}
          trend={mockMetrics.conversationsTrend}
          trendLabel="vs yesterday"
          icon={MessageSquare}
          iconColor="text-info"
        />
        <MetricCard
          title="Active Orders"
          value={mockMetrics.activeOrders}
          icon={ShoppingCart}
          iconColor="text-warning"
        />
        <MetricCard
          title="Completed Orders"
          value={mockMetrics.completedOrders}
          trend={mockMetrics.ordersTrend}
          trendLabel="this week"
          icon={CheckCircle2}
          iconColor="text-success"
        />
        <MetricCard
          title="Revenue Today"
          value={formatCurrency(mockMetrics.revenueToday)}
          trend={mockMetrics.revenueTrend}
          trendLabel="vs yesterday"
          icon={DollarSign}
          iconColor="text-primary"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Weekly Revenue"
          value={formatCurrency(mockMetrics.revenueThisWeek)}
          icon={TrendingUp}
          iconColor="text-chart-1"
        />
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(mockMetrics.revenueThisMonth)}
          icon={TrendingUp}
          iconColor="text-chart-2"
        />
        <MetricCard
          title="Avg. Order Value"
          value={formatCurrency(mockMetrics.averageOrderValue)}
          icon={Users}
          iconColor="text-chart-3"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart className="lg:col-span-2" />
        <TopProducts />
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <RecentActivity
          conversations={mockConversations}
          orders={mockOrders}
        />
      </div>
    </div>
  );
}
