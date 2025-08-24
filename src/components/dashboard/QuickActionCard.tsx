import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  action: () => void;
}

export const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  color,
  action,
}: QuickActionCardProps) => {
  const gradientClasses = {
    primary: "from-primary/20 to-primary/5",
    secondary: "from-secondary/20 to-secondary/5",
    accent: "from-accent/20 to-accent/5",
    success: "from-success/20 to-success/5",
    warning: "from-warning/20 to-warning/5",
    error: "from-error/20 to-error/5",
  };

  const iconColorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  };

  return (
    <Card
      className="glass shadow-card hover-lift cursor-pointer group animate-slide-up"
      onClick={action}
    >
      <CardContent className="p-6">
        <div
          className={cn(
            "bg-gradient-to-br rounded-xl p-4 mb-4 transition-transform group-hover:scale-105",
            gradientClasses[color]
          )}
        >
          <Icon className={cn("h-8 w-8", iconColorClasses[color])} />
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};