import { cn } from "@/lib/utils";
import { formatDateTime, truncateText, getStatusColor } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ShoppingCart } from "lucide-react";
import type { Conversation, Order } from "@/types";

interface ActivityItem {
  id: string;
  type: 'conversation' | 'order';
  title: string;
  subtitle: string;
  status: string;
  timestamp: string;
}

interface RecentActivityProps {
  conversations: Conversation[];
  orders: Order[];
  className?: string;
}

export function RecentActivity({ conversations, orders, className }: RecentActivityProps) {
  // Combine and sort by timestamp
  const activities: ActivityItem[] = [
    ...conversations.slice(0, 5).map((conv) => ({
      id: conv.id,
      type: 'conversation' as const,
      title: conv.customerName,
      subtitle: `${conv.messageCount || 0} messages`,
      status: conv.status,
      timestamp: conv.lastMessageAt,
    })),
    ...orders.slice(0, 5).map((order) => ({
      id: order.id,
      type: 'order' as const,
      title: order.customerName,
      subtitle: order.id,
      status: order.paymentStatus,
      timestamp: order.createdAt,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  return (
    <div className={cn("bg-card rounded-xl shadow-card border border-border/50", className)}>
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Latest conversations and orders</p>
      </div>
      
      <div className="divide-y divide-border">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="p-4 hover:bg-muted/30 transition-colors cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  activity.type === 'conversation' 
                    ? "bg-info/10 text-info" 
                    : "bg-success/10 text-success"
                )}
              >
                {activity.type === 'conversation' ? (
                  <MessageSquare className="w-5 h-5" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs shrink-0",
                      getStatusColor(activity.status) === 'success' && "bg-success/10 text-success",
                      getStatusColor(activity.status) === 'warning' && "bg-warning/10 text-warning",
                      getStatusColor(activity.status) === 'destructive' && "bg-destructive/10 text-destructive",
                      getStatusColor(activity.status) === 'info' && "bg-info/10 text-info",
                    )}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.subtitle}
                </p>
              </div>
              
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDateTime(activity.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
