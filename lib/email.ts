import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder-key')

export async function sendAutoReply(to: string, name: string, message: string) {
  // Si no hay API key configurada, solo loguear y retornar éxito
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'placeholder-key') {
    console.log('Email not sent - RESEND_API_KEY not configured')
    console.log(`Would send email to ${to}:`, { name, message })
    return { success: true }
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@refined-llc.com',
      to,
      subject: 'Gracias por contactarnos - Refined LLC',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F172A;">Hola ${name},</h2>
          <p>${message}</p>
          <br/>
          <p style="color: #64748B;">Saludos cordiales,<br/>El equipo de Refined LLC</p>
          <hr style="border: 1px solid #E2E8F0; margin: 20px 0;"/>
          <p style="color: #94A3B8; font-size: 12px;">
            Refined LLC - Exceeding Expectations<br/>
            1234 Wilshire Blvd, Suite 500, Los Angeles, CA 90025<br/>
            +1 (310) 555-0100
          </p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

