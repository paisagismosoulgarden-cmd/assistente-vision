import { useState } from "react";
import { Plus, Bell, Check, Clock, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const reminders = [
  {
    id: 1,
    title: "Pagar conta de luz",
    description: "Vencimento dia 15",
    date: "15/03/2024",
    time: "09:00",
    status: "pending",
    priority: "high",
    category: "Contas",
  },
  {
    id: 2,
    title: "Reunião com cliente",
    description: "Apresentação do novo projeto",
    date: "20/03/2024",
    time: "14:00",
    status: "pending",
    priority: "medium",
    category: "Trabalho",
  },
  {
    id: 3,
    title: "Aniversário da Maria",
    description: "Comprar presente",
    date: "25/03/2024",
    time: "10:00",
    status: "pending",
    priority: "low",
    category: "Pessoal",
  },
  {
    id: 4,
    title: "Renovar seguro do carro",
    description: "Contato com corretora",
    date: "10/03/2024",
    time: "11:00",
    status: "completed",
    priority: "high",
    category: "Documentos",
  },
];

const ReminderCard = ({ reminder }: { reminder: typeof reminders[0] }) => {
  const priorityColors = {
    high: "border-error bg-error/5",
    medium: "border-warning bg-warning/5",
    low: "border-success bg-success/5",
  };

  const priorityBadgeColors = {
    high: "bg-error/10 text-error border-error/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20",
  };

  return (
    <Card
      className={cn(
        "glass shadow-card hover-lift cursor-pointer transition-all animate-slide-up",
        priorityColors[reminder.priority as keyof typeof priorityColors],
        reminder.status === "completed" && "opacity-60"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={cn(
              "font-semibold",
              reminder.status === "completed" && "line-through"
            )}>
              {reminder.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{reminder.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              reminder.status === "completed" && "text-success"
            )}
          >
            {reminder.status === "completed" ? (
              <Check className="h-4 w-4" />
            ) : (
              <Bell className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {reminder.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {reminder.time}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {reminder.category}
            </Badge>
            <Badge
              variant="outline"
              className={cn("text-xs", priorityBadgeColors[reminder.priority as keyof typeof priorityBadgeColors])}
            >
              {reminder.priority === "high" && "Alta"}
              {reminder.priority === "medium" && "Média"}
              {reminder.priority === "low" && "Baixa"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Reminders = () => {
  const [filter, setFilter] = useState("all");

  const filteredReminders = reminders.filter(reminder => {
    if (filter === "all") return true;
    if (filter === "pending") return reminder.status === "pending";
    if (filter === "completed") return reminder.status === "completed";
    if (filter === "high") return reminder.priority === "high";
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lembretes</h1>
            <p className="text-muted-foreground">Nunca esqueça do que é importante</p>
          </div>
          
          <Button className="gradient-accent text-primary-foreground shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lembrete
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Card className="glass shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "Todos", count: reminders.length },
              { value: "pending", label: "Pendentes", count: reminders.filter(r => r.status === "pending").length },
              { value: "completed", label: "Concluídos", count: reminders.filter(r => r.status === "completed").length },
              { value: "high", label: "Alta Prioridade", count: reminders.filter(r => r.priority === "high").length },
            ].map(({ value, label, count }) => (
              <Button
                key={value}
                variant={filter === value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(value)}
                className={cn(
                  filter === value && "gradient-accent text-primary-foreground"
                )}
              >
                {label}
                <Badge variant="secondary" className="ml-2">
                  {count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReminders.map(reminder => (
          <ReminderCard key={reminder.id} reminder={reminder} />
        ))}
      </div>

      {filteredReminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Nenhum lembrete encontrado</p>
          <Button variant="outline" className="mt-4">
            Criar seu primeiro lembrete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reminders;