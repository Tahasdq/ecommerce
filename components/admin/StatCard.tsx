import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              {isPositive && (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-500">+{change}%</span>
                </>
              )}
              {isNegative && (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="font-medium text-red-500">{change}%</span>
                </>
              )}
              {change === 0 && (
                <span className="font-medium text-muted-foreground">0%</span>
              )}
              <span className="text-muted-foreground">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-lg", iconColor)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
