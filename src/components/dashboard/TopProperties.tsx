import { cn } from "@/lib/utils";
import { topPropertiesData } from "@/data/mockData";
import { formatPercentage } from "@/lib/formatters";

interface TopPropertiesProps {
  className?: string;
}

export function TopProperties({ className }: TopPropertiesProps) {
  const maxInquiries = Math.max(...topPropertiesData.map(p => p.inquiries));

  return (
    <div className={cn("bg-card rounded-xl shadow-card border border-border/50", className)}>
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold text-foreground">Top Properties</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Most inquired properties this week</p>
      </div>
      
      <div className="p-5 space-y-4">
        {topPropertiesData.map((property, index) => (
          <div key={property.propertyId} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {index + 1}
                </span>
                <div>
                  <span className="font-medium text-foreground">{property.propertyName}</span>
                  <p className="text-xs text-muted-foreground">{property.location}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">{property.inquiries} inquiries</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${(property.inquiries / maxInquiries) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-success min-w-[60px] text-right">
                {formatPercentage(property.conversionRate)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
