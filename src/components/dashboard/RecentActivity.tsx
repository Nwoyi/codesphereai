import { cn } from "@/lib/utils";
import { formatDateTime, getStatusColor, getSourceIcon } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar } from "lucide-react";
import type { Conversation, Viewing } from "@/types";

interface ActivityItem {
  id: string;
  type: 'conversation' | 'viewing';
  title: string;
  subtitle: string;
  status: string;
  timestamp: string;
  extra?: string;
}

interface RecentActivityProps {
  conversations: Conversation[];
  viewings: Viewing[];
  className?: string;
}

export function RecentActivity({ conversations, viewings, className }: RecentActivityProps) {
  // Combine and sort by timestamp
  const activities: ActivityItem[] = [
    ...conversations.slice(0, 5).map((conv) => ({
      id: conv.id,
      type: 'conversation' as const,
      title: conv.guestName,
      subtitle: conv.propertyInterestedName || 'General inquiry',
      status: conv.status,
      timestamp: conv.lastMessageAt,
      extra: conv.botHandled ? '🤖 Bot' : '👤 Manual',
    })),
    ...viewings.slice(0, 5).map((viewing) => ({
      id: viewing.id,
      type: 'viewing' as const,
      title: viewing.guestName,
      subtitle: viewing.propertyName,
      status: viewing.status,
      timestamp: viewing.createdAt,
      extra: getSourceIcon(viewing.source),
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  const formatStatus = (status: string): string => {
    return status.replace(/_/g, ' ');
  };

  return (
    <div className={cn("bg-card rounded-xl shadow-card border border-border/50", className)}>
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Latest inquiries and viewings</p>
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
                  <Calendar className="w-5 h-5" />
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
                      "text-xs shrink-0 capitalize",
                      getStatusColor(activity.status) === 'success' && "bg-success/10 text-success",
                      getStatusColor(activity.status) === 'info' && "bg-info/10 text-info",
                      getStatusColor(activity.status) === 'destructive' && "bg-destructive/10 text-destructive",
                      getStatusColor(activity.status) === 'secondary' && "bg-muted text-muted-foreground",
                    )}
                  >
                    {formatStatus(activity.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground truncate">
                    {activity.subtitle}
                  </p>
                  {activity.extra && (
                    <span className="text-xs text-muted-foreground">{activity.extra}</span>
                  )}
                </div>
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
