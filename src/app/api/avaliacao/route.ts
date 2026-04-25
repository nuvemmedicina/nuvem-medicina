import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { score, motivo, email, ts } = body

    // Validate
    if (typeof score !== 'number' || score < 0 || score > 10) {
      return NextResponse.json({ error: 'Nota inválida' }, { status: 400 })
    }

    // Classify NPS
    const category =
      score <= 6  ? 'detrator'  :
      score <= 8  ? 'neutro'    : 'promotor'

    const payload = { score, category, motivo: motivo || '', email: email || '', ts }

    // ── Option 1: Send to webhook (e.g. n8n, Make, Zapier) ──────────────────
    const webhookUrl = process.env.NPS_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
    }

    // ── Option 2: Send email via Resend ─────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from:    'nuvete@nuvemmedicina.com.br',
          to:      ['contato@nuvemmedicina.com.br'],
          subject: `[NPS] Nota ${score}/10 — ${category.toUpperCase()}`,
          html: `
            <h2>Nova avaliação NU.V.E.M</h2>
            <p><strong>Nota:</strong> ${score}/10 (${category})</p>
            ${motivo ? `<p><strong>Motivo:</strong> ${motivo}</p>` : ''}
            ${email  ? `<p><strong>E-mail:</strong> ${email}</p>` : ''}
            <p><strong>Data:</strong> ${new Date(ts).toLocaleString('pt-BR')}</p>
          `,
        }),
      })
    }

    return NextResponse.json({ ok: true, category })
  } catch (err) {
    console.error('[/api/avaliacao]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
