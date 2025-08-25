import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, UserCheck, UserX, Search, Plus, Loader2 } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AuthorizedUser {
  id: string;
  email: string;
  authorized: boolean;
  authorized_at: string | null;
  created_at: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<AuthorizedUser[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkAdminAccess();
    loadUsers();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!adminData) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
  };

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('authorized_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const addUser = async () => {
    if (!newEmail) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido",
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('authorized_users')
      .insert({
        email: newEmail,
        authorized: false,
        authorized_by: user?.id,
      });

    if (error) {
      toast({
        title: "Erro ao adicionar usuário",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Usuário adicionado",
        description: "O usuário foi adicionado à lista de espera",
      });
      setNewEmail("");
      loadUsers();
    }
  };

  const toggleAuthorization = async (userId: string, currentStatus: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('authorized_users')
      .update({
        authorized: !currentStatus,
        authorized_by: user?.id,
        authorized_at: !currentStatus ? new Date().toISOString() : null,
      })
      .eq('id', userId);

    if (error) {
      toast({
        title: "Erro ao atualizar autorização",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Autorização atualizada",
        description: `Usuário ${!currentStatus ? 'autorizado' : 'desautorizado'} com sucesso`,
      });
      loadUsers();
    }
  };

  const makeAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    // First, ensure user is in authorized_users
    await supabase
      .from('authorized_users')
      .upsert({
        email: user.email,
        authorized: true,
        authorized_by: user.id,
        authorized_at: new Date().toISOString(),
      });

    // Then add to admin_users
    const { error } = await supabase
      .from('admin_users')
      .insert({
        user_id: user.id,
      });

    if (!error) {
      toast({
        title: "Você agora é administrador",
        description: "Você tem acesso total ao sistema",
      });
      setIsAdmin(true);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Configuração Inicial
            </CardTitle>
            <CardDescription>
              Configure o primeiro administrador do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Você será o primeiro administrador do sistema. Clique no botão abaixo para se tornar administrador.
            </p>
            <Button onClick={makeAdmin} className="w-full">
              Tornar-me Administrador
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Administração
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie os acessos autorizados ao sistema
          </p>
        </div>
        <Button onClick={() => navigate("/")} variant="outline">
          Voltar ao Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Usuário</CardTitle>
          <CardDescription>
            Adicione emails que poderão fazer login no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="new-email" className="sr-only">
                Email do novo usuário
              </Label>
              <Input
                id="new-email"
                type="email"
                placeholder="email@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addUser()}
              />
            </div>
            <Button onClick={addUser}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados</CardTitle>
          <CardDescription>
            Gerencie as autorizações de acesso ao sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead>Data de Autorização</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Nenhum usuário encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        {user.authorized ? (
                          <Badge className="bg-success/10 text-success border-success/20">
                            <UserCheck className="mr-1 h-3 w-3" />
                            Autorizado
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <UserX className="mr-1 h-3 w-3" />
                            Pendente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {user.authorized_at 
                          ? new Date(user.authorized_at).toLocaleDateString('pt-BR')
                          : '-'
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={user.authorized}
                          onCheckedChange={() => toggleAuthorization(user.id, user.authorized)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}