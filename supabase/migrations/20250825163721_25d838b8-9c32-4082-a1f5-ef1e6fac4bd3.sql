-- Create authorized_users table for access control
CREATE TABLE public.authorized_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  authorized BOOLEAN DEFAULT false,
  authorized_by UUID REFERENCES auth.users(id),
  authorized_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table to define who can authorize others
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.authorized_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Authorized users policies
CREATE POLICY "Admins can view all authorized users" 
ON public.authorized_users FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage authorized users" 
ON public.authorized_users FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);

-- Admin users policies
CREATE POLICY "Admins can view admin list" 
ON public.admin_users FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);

-- Create trigger for authorized_users timestamps
CREATE TRIGGER update_authorized_users_updated_at
BEFORE UPDATE ON public.authorized_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the first admin (you'll need to update this with your email after first login)
-- This is just a placeholder that will be updated later
INSERT INTO public.authorized_users (email, authorized) 
VALUES ('seu-email-admin@gmail.com', true)
ON CONFLICT (email) DO NOTHING;