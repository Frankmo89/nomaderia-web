import { Resend } from 'resend';

const resend = new Resend('re_8mtW19Q1_DwkNJfH9CCkTY37iELMDsGsM');

export interface LeadData {
  clientname: string;
  clientemail: string;
  phonewhatsapp: string;
  destination: string;
  tripstartdate: string;
  tripenddate: string;
  travelers: number;
  budgetrange: string;
  leadsource: string;
  leadsourceother?: string;
  comments?: string;
}

export async function sendClientConfirmationEmail(leadData: LeadData) {
  const emailContent = `Hola ${leadData.clientname.split(' ')[0]},

¡Gracias por confiar en Nomadería para planear tu aventura!

Recibimos tu solicitud y ya estamos trabajando en tu itinerario personalizado para ${leadData.destination}.

📋 RESUMEN DE TU SOLICITUD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Destino: ${leadData.destination}
• Fechas: ${leadData.tripstartdate} al ${leadData.tripenddate}
• Viajeros: ${leadData.travelers} persona(s)
• Presupuesto: ${leadData.budgetrange}

⏱️ ¿QUÉ SIGUE?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Te contactaremos en las próximas 24 horas por WhatsApp o email con tu plan personalizado.

Mientras tanto, puedes:
✓ Revisar nuestros paquetes: https://nomaderia.travel
✓ Escribirme directamente por WhatsApp: +1 858 899 6802

${leadData.comments ? `\n📝 TU MENSAJE:\n"${leadData.comments}"\n` : ''}

"Aquí nadie se pierde... nomás se encuentra."

Francisco Alonso
Nomadería - Tu Arquitecto de Aventuras
Agente Certificado - Travel Agent Training 2025

📧 nomaderia.travel@gmail.com
📱 WhatsApp: +1 858 899 6802
🌐 www.nomaderia.travel`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Nomadería <onboarding@resend.dev>', // Resend's test domain
      to: [leadData.clientemail],
      subject: `✅ Tu Plan de Aventura está en proceso - ${leadData.destination}`,
      text: emailContent,
    });

    if (error) {
      console.error('Error sending client email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending client email:', error);
    return { success: false, error };
  }
}

export async function sendAdminNotificationEmail(leadData: LeadData) {
  const emailContent = `🎯 NUEVO LEAD RECIBIDO - ACCIÓN REQUERIDA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMACIÓN DEL CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre: ${leadData.clientname}
Email: ${leadData.clientemail}
WhatsApp: ${leadData.phonewhatsapp}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗺️ DETALLES DEL VIAJE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Destino: ${leadData.destination}
Fechas: ${leadData.tripstartdate} al ${leadData.tripenddate}
Viajeros: ${leadData.travelers} persona(s)
Presupuesto: ${leadData.budgetrange}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ORIGEN DEL LEAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fuente: ${leadData.leadsource}${leadData.leadsourceother ? ` - ${leadData.leadsourceother}` : ''}

${leadData.comments ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n💬 COMENTARIOS DEL CLIENTE\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"${leadData.comments}"\n\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ACCIÓN REQUERIDA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Contactar al cliente en las próximas 24 horas
2. Enviar por WhatsApp: +${leadData.phonewhatsapp}
3. O responder a: ${leadData.clientemail}

Ver en Admin Panel: https://nomaderia.travel/admin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email automático generado por Nomadería Web App`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Nomadería Leads <onboarding@resend.dev>',
      to: ['nomaderia.travel@gmail.com'],
      subject: `🎯 Nuevo Lead - ${leadData.clientname} - ${leadData.destination}`,
      text: emailContent,
    });

    if (error) {
      console.error('Error sending admin email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending admin email:', error);
    return { success: false, error };
  }
}

export async function sendBothEmails(leadData: LeadData) {
  const [clientResult, adminResult] = await Promise.all([
    sendClientConfirmationEmail(leadData),
    sendAdminNotificationEmail(leadData),
  ]);

  return {
    client: clientResult,
    admin: adminResult,
    success: clientResult.success && adminResult.success,
  };
}
