import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, projectType, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email from:", name, email);

    // Send notification email to Nicholas
    const notificationResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["nicholasmaina826@gmail.com"],
      subject: `New ${projectType} inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Notification email sent:", notificationResponse);

    // Send confirmation email to the sender
    const confirmationResponse = await resend.emails.send({
      from: "Nicholas Mureithi <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for reaching out!",
      html: `
        <h2>Thank you for contacting me, ${name}!</h2>
        <p>I've received your message about your <strong>${projectType}</strong> project and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 16px; margin: 16px 0; color: #555;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>Nicholas Mureithi</p>
      `,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
