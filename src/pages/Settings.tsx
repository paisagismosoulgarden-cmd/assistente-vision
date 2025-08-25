import { useState } from "react";
import { User, Bell, MessageSquare, Tag, Palette, Shield, Download, Wifi, Key, Database, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const settingsMenu = [
  { key: "profile", label: "Perfil", icon: User },
  { key: "notifications", label: "Notificações", icon: Bell },
  { key: "whatsapp", label: "WhatsApp & Evolution", icon: MessageSquare },
  { key: "categories", label: "Categorias", icon: Tag },
  { key: "appearance", label: "Aparência", icon: Palette },
  { key: "security", label: "Segurança", icon: Shield },
  { key: "export", label: "Exportar Dados", icon: Download },
];

const Settings = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("whatsapp");
  const [evolutionWebhook, setEvolutionWebhook] = useState("");
  const [evolutionInstance, setEvolutionInstance] = useState("");
  const [evolutionApiKey, setEvolutionApiKey] = useState("");
  const [settings, setSettings] = useState({
    notifications: true,
    dailySummary: true,
    summaryTime: "08:00",
    currency: "BRL",
    timezone: "America/Sao_Paulo",
    theme: "light",
  });

  const handleSaveWebhook = () => {
    localStorage.setItem('evolutionWebhook', evolutionWebhook);
    localStorage.setItem('evolutionInstance', evolutionInstance);
    localStorage.setItem('evolutionApiKey', evolutionApiKey);
    
    toast({
      title: "Configurações salvas",
      description: "Evolution API configurado com sucesso",
    });
  };

  const testWebhook = async () => {
    toast({
      title: "Testando conexão",
      description: "Enviando mensagem de teste...",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">Personalize sua experiência</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Menu */}
        <div>
          <Card className="glass shadow-card">
            <CardContent className="p-0">
              <nav className="space-y-1 p-2">
                {settingsMenu.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all hover:bg-muted",
                      activeSection === key && "bg-muted text-primary font-medium"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "whatsapp" && (
            <Card className="glass shadow-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-success" />
                  Integração Evolution API / WhatsApp
                </CardTitle>
                <CardDescription>Configure a conexão com o WhatsApp através do Evolution API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                  <p className="text-sm text-foreground">
                    <strong>URL do Webhook Supabase:</strong>
                  </p>
                  <code className="text-xs bg-muted p-2 rounded block mt-2 break-all">
                    https://fhgfiveqtvpgtvzjykzy.supabase.co/functions/v1/evolution-webhook
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Configure esta URL no seu Evolution API para receber mensagens
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="evolution-instance">Nome da Instância Evolution</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="evolution-instance" 
                        placeholder="minha-instancia" 
                        className="glass"
                        value={evolutionInstance}
                        onChange={(e) => setEvolutionInstance(e.target.value)}
                      />
                      <Button variant="outline" size="icon">
                        <Database className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="evolution-api-key">API Key do Evolution</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="evolution-api-key" 
                        type="password"
                        placeholder="••••••••••••••••" 
                        className="glass"
                        value={evolutionApiKey}
                        onChange={(e) => setEvolutionApiKey(e.target.value)}
                      />
                      <Button variant="outline" size="icon">
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="evolution-webhook">URL Base do Evolution</Label>
                    <Input 
                      id="evolution-webhook" 
                      placeholder="https://api.evolution.com" 
                      className="glass"
                      value={evolutionWebhook}
                      onChange={(e) => setEvolutionWebhook(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveWebhook} className="gradient-primary text-primary-foreground">
                    Salvar Configurações
                  </Button>
                  <Button variant="outline" onClick={testWebhook}>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Testar Conexão
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Status da Conexão</Label>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 bg-warning rounded-full animate-pulse" />
                      <div>
                        <p className="font-medium text-warning">Aguardando Configuração</p>
                        <p className="text-sm text-muted-foreground">Configure os dados acima e conecte sua instância</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "notifications" && (
            <Card className="glass shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Configure quando e como receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-summary">Resumo Diário</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba um resumo das suas atividades todos os dias
                    </p>
                  </div>
                  <Switch id="daily-summary" checked={settings.dailySummary} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary-time">Horário do Resumo</Label>
                  <Input
                    id="summary-time"
                    type="time"
                    value={settings.summaryTime}
                    className="max-w-32 glass"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reminder-notifications">Lembretes</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações para lembretes agendados
                    </p>
                  </div>
                  <Switch id="reminder-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="expense-alerts">Alertas de Gastos</Label>
                    <p className="text-sm text-muted-foreground">
                      Avisos quando gastos excedem orçamento
                    </p>
                  </div>
                  <Switch id="expense-alerts" defaultChecked />
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "categories" && (
            <Card className="glass shadow-card hover-lift">
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
                <CardDescription>Gerencie as categorias para organizar suas transações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Alimentação", "Transporte", "Lazer", "Educação", "Saúde"].map((category) => (
                    <div key={category} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="font-medium">{category}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm" className="text-error">Excluir</Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full gradient-primary text-primary-foreground">
                    Adicionar Categoria
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;