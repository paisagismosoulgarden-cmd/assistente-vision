import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users, Video, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { UpcomingAppointments } from "@/components/schedule/UpcomingAppointments";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState("month");

  const todayEvents = [
    { time: "09:00", title: "Reunião de Equipe", location: "Online", type: "meeting", icon: Video, priority: "high" },
    { time: "14:30", title: "Consulta Médica", location: "Dr. Silva", type: "health", icon: Users, priority: "medium" },
    { time: "18:00", title: "Academia", location: "Smart Fit", type: "personal", icon: Star, priority: "low" },
  ];

  const typeStyles = {
    meeting: "bg-secondary/10 text-secondary border-secondary/20",
    health: "bg-error/10 text-error border-error/20",
    personal: "bg-success/10 text-success border-success/20",
  };

  const priorityColors = {
    high: "bg-error",
    medium: "bg-warning",
    low: "bg-success",
  };

  return (
    <div className="min-h-screen space-y-8 animate-fade-in p-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background/80" />
        <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Agenda
            </h1>
            <p className="text-muted-foreground text-lg">Organize seus compromissos e eventos</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium">5 eventos hoje</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm font-medium">12 esta semana</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="inline-flex rounded-xl bg-muted/50 backdrop-blur-sm p-1.5 shadow-inner">
              <Button
                variant={view === "day" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("day")}
                className={cn(
                  "rounded-lg transition-all",
                  view === "day" && "shadow-lg bg-background"
                )}
              >
                Dia
              </Button>
              <Button
                variant={view === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("week")}
                className={cn(
                  "rounded-lg transition-all",
                  view === "week" && "shadow-lg bg-background"
                )}
              >
                Semana
              </Button>
              <Button
                variant={view === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("month")}
                className={cn(
                  "rounded-lg transition-all",
                  view === "month" && "shadow-lg bg-background"
                )}
              >
                Mês
              </Button>
            </div>
            
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Novo Compromisso
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Calendar Section */}
        <div className="xl:col-span-3">
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b pb-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold">
                    {date && format(date, "MMMM 'de' yyyy", { locale: ptBR })}
                  </CardTitle>
                  <CardDescription className="text-base">
                    Selecione uma data para ver os eventos
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-xl hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="default"
                    className="rounded-xl px-4"
                    onClick={() => setDate(new Date())}
                  >
                    Hoje
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-xl hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl w-full"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                  month: "space-y-4 w-full",
                  caption: "flex justify-center pt-1 relative items-center hidden",
                  caption_label: "text-base font-semibold",
                  nav: "space-x-1 flex items-center",
                  nav_button: cn(
                    "h-9 w-9 bg-transparent p-0 hover:bg-muted rounded-lg transition-colors",
                    "hover:text-primary"
                  ),
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse",
                  head_row: "flex w-full",
                  head_cell: "text-muted-foreground rounded-md w-full font-medium text-sm uppercase tracking-wide",
                  row: "flex w-full mt-2",
                  cell: cn(
                    "relative h-12 w-full text-center text-sm p-0 align-middle",
                    "focus-within:relative focus-within:z-20",
                    "[&:has([aria-selected])]:rounded-xl",
                    "[&:has([aria-selected].day-range-end)]:rounded-r-xl",
                    "[&:has([aria-selected].day-outside)]:bg-accent/50"
                  ),
                  day: cn(
                    "h-12 w-full p-0 font-normal",
                    "aria-selected:opacity-100",
                    "hover:bg-muted rounded-xl transition-all",
                    "hover:scale-110 hover:font-semibold"
                  ),
                  day_selected: cn(
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary hover:text-primary-foreground",
                    "focus:bg-primary focus:text-primary-foreground",
                    "rounded-xl font-semibold shadow-lg"
                  ),
                  day_today: "bg-accent text-accent-foreground font-semibold rounded-xl",
                  day_outside: "text-muted-foreground/40 opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent/50 aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />

              {/* Calendar Legend */}
              <div className="mt-8 pt-6 border-t flex flex-wrap gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-sm" />
                  <span className="text-sm font-medium">Selecionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent shadow-sm" />
                  <span className="text-sm font-medium">Hoje</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-error shadow-sm" />
                  <span className="text-sm font-medium">Prioridade alta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-warning shadow-sm" />
                  <span className="text-sm font-medium">Prioridade média</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Today's Events */}
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background to-muted/10">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                Eventos de Hoje
              </CardTitle>
              <CardDescription className="text-base">
                {date && format(date, "dd 'de' MMMM", { locale: ptBR })}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {todayEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div 
                      key={index} 
                      className="group relative flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all cursor-pointer hover:shadow-md"
                    >
                      <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-xl", priorityColors[event.priority as keyof typeof priorityColors])} />
                      
                      <div className="flex items-center gap-3 flex-1 ml-2">
                        <div className={cn("p-2 rounded-lg", typeStyles[event.type as keyof typeof typeStyles])}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground">
                              {event.time}
                            </span>
                          </div>
                          <p className="font-medium text-sm mt-1 truncate">{event.title}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs text-muted-foreground truncate">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {todayEvents.length === 0 && (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Nenhum evento hoje</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background to-muted/10">
            <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                Próximos Eventos
              </CardTitle>
              <CardDescription className="text-base">Esta semana</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <UpcomingAppointments />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total do Mês</span>
                  <Badge variant="secondary" className="font-bold">28 eventos</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Reuniões</span>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Compromissos</span>
                  <Badge className="bg-error/10 text-error border-error/20">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pessoal</span>
                  <Badge className="bg-success/10 text-success border-success/20">8</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;