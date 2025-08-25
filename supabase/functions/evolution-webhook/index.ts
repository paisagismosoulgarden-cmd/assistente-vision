import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload = await req.json();
    console.log('Received webhook:', payload);

    // Store webhook data
    const { error: logError } = await supabase
      .from('webhook_logs')
      .insert({
        instance_name: payload.instance,
        event_type: payload.event,
        phone_number: payload.data?.remoteJid || payload.data?.from,
        message_content: payload.data?.message?.conversation || 
                        payload.data?.message?.extendedTextMessage?.text ||
                        JSON.stringify(payload.data?.message),
        raw_data: payload,
        processed: false
      });

    if (logError) {
      console.error('Error logging webhook:', logError);
    }

    // Process commands
    if (payload.event === 'messages.upsert' && payload.data?.message) {
      const message = payload.data.message.conversation || 
                     payload.data.message.extendedTextMessage?.text || '';
      
      const phoneNumber = payload.data.remoteJid || payload.data.from;
      
      // Parse commands
      if (message.toLowerCase().includes('agendar')) {
        // Extract appointment details
        console.log('Processing appointment request:', message);
        // TODO: Parse and create appointment
      } else if (message.toLowerCase().includes('lembrete')) {
        // Extract reminder details
        console.log('Processing reminder request:', message);
        // TODO: Parse and create reminder
      } else if (message.toLowerCase().includes('despesa') || message.toLowerCase().includes('receita')) {
        // Extract transaction details
        console.log('Processing transaction request:', message);
        // TODO: Parse and create transaction
      } else if (message.toLowerCase().includes('próximos') || message.toLowerCase().includes('agenda')) {
        // Send upcoming appointments
        console.log('Sending upcoming appointments');
        // TODO: Query and send appointments
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});