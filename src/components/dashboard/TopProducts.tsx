import { cn } from "@/lib/utils";
import { topProductsData } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";

interface TopProductsProps {
  className?: string;
}

export function TopProducts({ className }: TopProductsProps) {
  const maxSales = Math.max(...topProductsData.map(p => p.sales));

  return (
    <div className={cn("bg-card rounded-xl shadow-card border border-border/50", className)}>
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold text-foreground">Top Products</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Best selling items this week</p>
      </div>
      
      <div className="p-5 space-y-4">
        {topProductsData.map((product, index) => (
          <div key={product.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {index + 1}
                </span>
                <span className="font-medium text-foreground">{product.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{product.sales} sales</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${(product.sales / maxSales) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground min-w-[80px] text-right">
                {formatCurrency(product.revenue)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
