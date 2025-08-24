import { ArrowDownRight, ArrowUpRight, ShoppingCart, Home, Car, Coffee, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    description: "Supermercado Extra",
    category: "Alimentação",
    amount: -324.50,
    date: "Hoje",
    icon: ShoppingCart,
  },
  {
    id: 2,
    description: "Salário",
    category: "Receita",
    amount: 5500.00,
    date: "Ontem",
    icon: Briefcase,
  },
  {
    id: 3,
    description: "Aluguel",
    category: "Moradia",
    amount: -1200.00,
    date: "2 dias atrás",
    icon: Home,
  },
  {
    id: 4,
    description: "Uber",
    category: "Transporte",
    amount: -45.80,
    date: "3 dias atrás",
    icon: Car,
  },
  {
    id: 5,
    description: "Café da manhã",
    category: "Alimentação",
    amount: -32.00,
    date: "3 dias atrás",
    icon: Coffee,
  },
];

export const RecentTransactions = () => {
  return (
    <div className="space-y-3">
      {transactions.map((transaction) => {
        const Icon = transaction.icon;
        const isIncome = transaction.amount > 0;

        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors animate-slide-up"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  isIncome ? "bg-success/10" : "bg-muted"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isIncome ? "text-success" : "text-muted-foreground"
                  )}
                />
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {isIncome ? (
                <ArrowUpRight className="h-4 w-4 text-success" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-error" />
              )}
              <span
                className={cn(
                  "font-semibold text-sm",
                  isIncome ? "text-success" : "text-foreground"
                )}
              >
                {isIncome ? "+" : ""}
                R$ {Math.abs(transaction.amount).toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};