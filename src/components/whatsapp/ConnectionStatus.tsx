import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate connection check
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Badge
      variant={isConnected ? "default" : "destructive"}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1",
        isConnected ? "bg-success/10 text-success border-success/20" : "",
        isAnimating && "animate-pulse"
      )}
    >
      {isConnected ? (
        <>
          <Wifi className="h-3 w-3" />
          <span className="hidden sm:inline text-xs">WhatsApp</span>
          <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3" />
          <span className="hidden sm:inline text-xs">Desconectado</span>
        </>
      )}
    </Badge>
  );
};