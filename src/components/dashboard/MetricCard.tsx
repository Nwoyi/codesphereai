import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatNumber, formatTrend } from "@/lib/formatters";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  iconColor = "text-primary",
  className,
}: MetricCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div
      className={cn(
        "bg-card rounded-xl p-5 shadow-card border border-border/50 transition-all duration-200 hover:shadow-card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
          {trend !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  isPositive ? "text-success" : "text-destructive"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {formatTrend(trend)}
              </span>
              {trendLabel && (
                <span className="text-sm text-muted-foreground">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center bg-muted/50",
            iconColor
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
