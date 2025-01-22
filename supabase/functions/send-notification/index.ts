import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  type: 'contact' | 'schedule';
  name: string;
  email: string;
  phone?: string;
  message: string;
  sessionDate?: string;
  sessionTime?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_ANON_KEY!
    );

    const emailRequest: EmailRequest = await req.json();
    console.log('Received email request:', emailRequest);

    let subject, html;

    if (emailRequest.type === 'contact') {
      subject = `New Contact Form Submission from ${emailRequest.name}`;
      html = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${emailRequest.name}</p>
        <p><strong>Email:</strong> ${emailRequest.email}</p>
        <p><strong>Phone:</strong> ${emailRequest.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${emailRequest.message}</p>
      `;
    } else {
      subject = `New Session Scheduled with ${emailRequest.name}`;
      html = `
        <h2>New Session Scheduled</h2>
        <p><strong>Name:</strong> ${emailRequest.name}</p>
        <p><strong>Email:</strong> ${emailRequest.email}</p>
        <p><strong>Phone:</strong> ${emailRequest.phone || 'Not provided'}</p>
        <p><strong>Date:</strong> ${emailRequest.sessionDate}</p>
        <p><strong>Time:</strong> ${emailRequest.sessionTime}</p>
        <p><strong>Requirements:</strong></p>
        <p>${emailRequest.message}</p>
      `;
    }

    console.log('Sending email with subject:', subject);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Media Owl Digital <notifications@mediaowl.co.za>',
        to: ['admin@mediaowl.co.za'],
        subject,
        html,
        reply_to: emailRequest.email,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Resend API error:', error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await res.json();
    console.log('Email sent successfully:', data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in send-notification function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);