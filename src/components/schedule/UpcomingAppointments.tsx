import { Calendar, Clock, MapPin, Video, Users } from "lucide-react";
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
    color: "text-secondary",
  },
  {
    id: 2,
    title: "Consulta Médica",
    time: "14:30",
    date: "Hoje",
    location: "Dr. Silva - Centro",
    type: "health",
    icon: Users,
    color: "text-error",
  },
  {
    id: 3,
    title: "Almoço de Negócios",
    time: "12:00",
    date: "Amanhã",
    location: "Restaurante Plaza",
    type: "business",
    icon: MapPin,
    color: "text-warning",
  },
  {
    id: 4,
    title: "Academia",
    time: "18:00",
    date: "Amanhã",
    location: "Smart Fit",
    type: "personal",
    icon: Clock,
    color: "text-success",
  },
];

const typeColors = {
  meeting: "bg-secondary/10 text-secondary border-secondary/20",
  health: "bg-error/10 text-error border-error/20",
  business: "bg-warning/10 text-warning border-warning/20",
  personal: "bg-success/10 text-success border-success/20",
};

export const UpcomingAppointments = () => {
  return (
    <div className="space-y-3">
      {appointments.map((appointment) => {
        const Icon = appointment.icon;

        return (
          <div
            key={appointment.id}
            className="p-3 rounded-lg border hover:bg-muted/50 transition-all hover-lift cursor-pointer animate-slide-up"
          >
            <div className="flex items-start gap-3">
              <div className={cn("p-2 rounded-lg", appointment.color, "bg-current/10")}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{appointment.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{appointment.date}</span>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{appointment.time}</span>
                </div>
                <Badge
                  variant="outline"
                  className={cn("text-xs", typeColors[appointment.type as keyof typeof typeColors])}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {appointment.location}
                </Badge>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};