import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  subtitle?: string;
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
}

export const StatsCard = ({
  title,
  value,
  change,
  trend,
  subtitle,
  icon: Icon,
  color,
}: StatsCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
  };

  const iconBgClasses = {
    primary: "gradient-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };

  return (
    <Card className="glass shadow-card hover-lift animate-slide-up">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {change && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  trend === "up" ? "text-success" : "text-error"
                )}
              >
                {trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {change}
              </div>
            )}
          </div>
          <div
            className={cn(
              "p-3 rounded-xl",
              iconBgClasses[color],
              "shadow-glow"
            )}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};