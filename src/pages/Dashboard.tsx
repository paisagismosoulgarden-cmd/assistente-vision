import { ArrowUpRight, ArrowDownRight, DollarSign, Calendar, Bell, TrendingUp, CreditCard, CalendarPlus, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { FinanceChart } from "@/components/finance/FinanceChart";
import { RecentTransactions } from "@/components/finance/RecentTransactions";
import { UpcomingAppointments } from "@/components/schedule/UpcomingAppointments";

const Dashboard = () => {
  const stats = [
    {
      title: "Saldo Atual",
      value: "R$ 2.450,00",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      color: "success" as const,
    },
    {
      title: "Gastos do Mês",
      value: "R$ 1.890,00",
      change: "-5.2%",
      trend: "down" as const,
      icon: TrendingUp,
      color: "error" as const,
    },
    {
      title: "Próximos Compromissos",
      value: "5",
      subtitle: "Esta semana",
      icon: Calendar,
      color: "secondary" as const,
    },
    {
      title: "Lembretes Ativos",
      value: "12",
      subtitle: "Pendentes",
      icon: Bell,
      color: "accent" as const,
    },
  ];

  const quickActions = [
    {
      title: "Novo Gasto",
      description: "Registrar uma nova despesa",
      icon: CreditCard,
      color: "error" as const,
      action: () => console.log("New expense"),
    },
    {
      title: "Agendar Compromisso",
      description: "Adicionar evento na agenda",
      icon: CalendarPlus,
      color: "secondary" as const,
      action: () => console.log("New appointment"),
    },
    {
      title: "Criar Lembrete",
      description: "Definir um novo lembrete",
      icon: Plus,
      color: "accent" as const,
      action: () => console.log("New reminder"),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h1 className="text-3xl font-bold mb-2">
          Olá, <span className="gradient-primary bg-clip-text text-transparent">João</span>! 👋
        </h1>
        <p className="text-muted-foreground">
          Aqui está o resumo das suas atividades de hoje
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass shadow-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              Gastos por Categoria
            </CardTitle>
            <CardDescription>Distribuição mensal dos gastos</CardDescription>
          </CardHeader>
          <CardContent>
            <FinanceChart type="pie" />
          </CardContent>
        </Card>

        <Card className="glass shadow-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              Evolução Mensal
            </CardTitle>
            <CardDescription>Receitas e despesas ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <FinanceChart type="line" />
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card className="glass shadow-card hover-lift h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>Últimas movimentações financeiras</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  Ver todas
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <div>
          <Card className="glass shadow-card hover-lift h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Próximos</CardTitle>
                  <CardDescription>Compromissos</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  Ver todos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <UpcomingAppointments />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;