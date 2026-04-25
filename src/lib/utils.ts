import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatWhatsAppMessage(
  nome: string,
  telefone: string,
  servico: string,
  mensagem?: string,
) {
  const lines = [
    'Olá! Gostaria de agendar na NU.V.E.M Medicina.',
    '',
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
    `Serviço: ${servico}`,
  ]
  if (mensagem) lines.push(`Mensagem: ${mensagem}`)
  return encodeURIComponent(lines.join('\n'))
}
