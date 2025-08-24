import { useState } from "react";
import { Download, TrendingUp, TrendingDown, DollarSign, Calendar, PieChart, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceChart } from "@/components/finance/FinanceChart";
import { StatsCard } from "@/components/dashboard/StatsCard";

const Reports = () => {
  const [period, setPeriod] = useState("month");

  const metrics = [
    {
      title: "Receita Total",
      value: "R$ 8.450,00",
      change: "+15.3%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "success" as const,
    },
    {
      title: "Gastos Total",
      value: "R$ 5.230,00",
      change: "-8.2%",
      trend: "down" as const,
      icon: TrendingDown,
      color: "error" as const,
    },
    {
      title: "Taxa de Economia",
      value: "38.1%",
      change: "+5.4%",
      trend: "up" as const,
      icon: DollarSign,
      color: "primary" as const,
    },
    {
      title: "Média Diária",
      value: "R$ 267,00",
      change: "+2.1%",
      trend: "up" as const,
      icon: BarChart3,
      color: "secondary" as const,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Relatórios</h1>
            <p className="text-muted-foreground">Análises detalhadas dos seus dados</p>
          </div>
          
          <div className="flex gap-3">
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
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Agenda
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Produtividade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <StatsCard key={index} {...metric} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Fluxo de Caixa</CardTitle>
                <CardDescription>Receitas vs Despesas ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <FinanceChart type="line" />
              </CardContent>
            </Card>

            <Card className="glass shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Top Categorias</CardTitle>
                <CardDescription>Maiores gastos por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <FinanceChart type="pie" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Table */}
          <Card className="glass shadow-card hover-lift">
            <CardHeader>
              <CardTitle>Análise Detalhada</CardTitle>
              <CardDescription>Breakdown completo por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Categoria</th>
                      <th className="text-right py-3 px-4">Orçamento</th>
                      <th className="text-right py-3 px-4">Gasto</th>
                      <th className="text-right py-3 px-4">Restante</th>
                      <th className="text-right py-3 px-4">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Alimentação</td>
                      <td className="text-right py-3 px-4">R$ 1.000,00</td>
                      <td className="text-right py-3 px-4">R$ 850,00</td>
                      <td className="text-right py-3 px-4 text-success">R$ 150,00</td>
                      <td className="text-right py-3 px-4">85%</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Transporte</td>
                      <td className="text-right py-3 px-4">R$ 500,00</td>
                      <td className="text-right py-3 px-4">R$ 430,00</td>
                      <td className="text-right py-3 px-4 text-success">R$ 70,00</td>
                      <td className="text-right py-3 px-4">86%</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Lazer</td>
                      <td className="text-right py-3 px-4">R$ 300,00</td>
                      <td className="text-right py-3 px-4">R$ 280,00</td>
                      <td className="text-right py-3 px-4 text-success">R$ 20,00</td>
                      <td className="text-right py-3 px-4">93%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="glass shadow-card">
            <CardHeader>
              <CardTitle>Relatório de Agenda</CardTitle>
              <CardDescription>Análise dos seus compromissos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Relatório de agenda em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity">
          <Card className="glass shadow-card">
            <CardHeader>
              <CardTitle>Relatório de Produtividade</CardTitle>
              <CardDescription>Métricas de desempenho</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Relatório de produtividade em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;