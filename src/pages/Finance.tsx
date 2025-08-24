import { useState } from "react";
import { Plus, Download, Filter, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceChart } from "@/components/finance/FinanceChart";
import { RecentTransactions } from "@/components/finance/RecentTransactions";
import { StatsCard } from "@/components/dashboard/StatsCard";

const Finance = () => {
  const [filter, setFilter] = useState("all");
  const [period, setPeriod] = useState("month");

  const stats = [
    {
      title: "Total de Receitas",
      value: "R$ 5.420,50",
      change: "+15.3%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "success" as const,
    },
    {
      title: "Total de Gastos",
      value: "R$ 2.970,30",
      change: "-8.2%",
      trend: "down" as const,
      icon: TrendingDown,
      color: "error" as const,
    },
    {
      title: "Saldo Atual",
      value: "R$ 2.450,20",
      change: "+12.7%",
      trend: "up" as const,
      icon: DollarSign,
      color: "primary" as const,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Finanças</h1>
            <p className="text-muted-foreground">Gerencie suas receitas e despesas</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px] glass">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="glass">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            
            <Button variant="outline" className="glass">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            
            <Button className="gradient-primary text-primary-foreground shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="income">Receitas</TabsTrigger>
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
                <CardDescription>Como seus gastos estão distribuídos</CardDescription>
              </CardHeader>
              <CardContent>
                <FinanceChart type="pie" />
              </CardContent>
            </Card>

            <Card className="glass shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Fluxo de Caixa</CardTitle>
                <CardDescription>Receitas vs Despesas ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <FinanceChart type="line" />
              </CardContent>
            </Card>
          </div>

          {/* Transactions */}
          <Card className="glass shadow-card hover-lift">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>Suas últimas movimentações financeiras</CardDescription>
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
        </TabsContent>

        <TabsContent value="income">
          <Card className="glass shadow-card">
            <CardHeader>
              <CardTitle>Receitas</CardTitle>
              <CardDescription>Todas as suas fontes de renda</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card className="glass shadow-card">
            <CardHeader>
              <CardTitle>Despesas</CardTitle>
              <CardDescription>Todos os seus gastos</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card className="glass shadow-card">
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
              <CardDescription>Análise detalhada por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <FinanceChart type="pie" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;