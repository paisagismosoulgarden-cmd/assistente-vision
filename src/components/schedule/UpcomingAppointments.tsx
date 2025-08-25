import { Calendar, Clock, MapPin, Video, Users, Briefcase, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const appointments = [
  {
    id: 1,
    title: "Reunião de Equipe",
    time: "09:00",
    date: "Hoje",
    location: "Online",
    type: "meeting",
    icon: Video,
    priority: "high",
    duration: "1h",
  },
  {
    id: 2,
    title: "Consulta Médica",
    time: "14:30",
    date: "Hoje",
    location: "Dr. Silva - Centro",
    type: "health",
    icon: Heart,
    priority: "medium",
    duration: "30min",
  },
  {
    id: 3,
    title: "Almoço de Negócios",
    time: "12:00",
    date: "Amanhã",
    location: "Restaurante Plaza",
    type: "business",
    icon: Briefcase,
    priority: "high",
    duration: "2h",
  },
  {
    id: 4,
    title: "Academia",
    time: "18:00",
    date: "Amanhã",
    location: "Smart Fit",
    type: "personal",
    icon: Star,
    priority: "low",
    duration: "1h30",
  },
];

const typeGradients = {
  meeting: "from-secondary/20 to-secondary/5",
  health: "from-error/20 to-error/5",
  business: "from-warning/20 to-warning/5",
  personal: "from-success/20 to-success/5",
};

const typeColors = {
  meeting: "bg-secondary/10 text-secondary",
  health: "bg-error/10 text-error",
  business: "bg-warning/10 text-warning",
  personal: "bg-success/10 text-success",
};

const priorityIndicators = {
  high: "bg-error",
  medium: "bg-warning",
  low: "bg-success",
};

export const UpcomingAppointments = () => {
  return (
    <div className="space-y-3">
      {appointments.map((appointment) => {
        const Icon = appointment.icon;

        return (
          <div
            key={appointment.id}
            className={cn(
              "group relative p-4 rounded-xl transition-all cursor-pointer",
              "hover:shadow-lg hover:scale-[1.02]",
              "bg-gradient-to-br",
              typeGradients[appointment.type as keyof typeof typeGradients],
              "border border-border/50"
            )}
          >
            {/* Priority Indicator */}
            <div className={cn(
              "absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-all",
              priorityIndicators[appointment.priority as keyof typeof priorityIndicators],
              "group-hover:w-1.5"
            )} />
            
            <div className="flex items-start gap-3 ml-2">
              <div className={cn(
                "p-2.5 rounded-xl shadow-sm",
                typeColors[appointment.type as keyof typeof typeColors]
              )}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{appointment.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-medium"
                  >
                    {appointment.duration}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{appointment.location}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {appointments.length === 0 && (
        <div className="text-center py-6">
          <Clock className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Nenhum evento próximo</p>
        </div>
      )}
    </div>
  );
};